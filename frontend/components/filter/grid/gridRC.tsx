import { Grid, GridDataProvider, GridDataProviderCallback, GridDataProviderParams, GridDefaultItem, GridElement } from "@hilla/react-components/Grid.js";
import { GridColumn } from "@hilla/react-components/GridColumn.js";
import { GridColumnGroup } from "@hilla/react-components/GridColumnGroup.js";
import { AutoGridProps, AutoGridRef } from "Frontend/components/grid/autogrid";

import { ColumnContext, SortState } from "Frontend/components/grid/autogrid-column-context";
import { ColumnOptions, getColumnOptions } from "Frontend/components/grid/autogrid-columns";
import { AutoGridRowNumberRenderer } from "Frontend/components/grid/autogrid-renderers";
import { ListService } from "Frontend/components/grid/crud";
import { HeaderSorter } from "Frontend/components/grid/header-sorter";
import { ModelInfo, PropertyInfo, getDefaultProperties } from "Frontend/components/grid/model-info";
import AndFilter from "Frontend/generated/dev/hilla/crud/filter/AndFilter";
import FilterUnion from "Frontend/generated/dev/hilla/crud/filter/FilterUnion";
import PropertyStringFilter from "Frontend/generated/dev/hilla/crud/filter/PropertyStringFilter";
import Sort from "Frontend/generated/dev/hilla/mappedtypes/Sort";
import Direction from "Frontend/generated/org/springframework/data/domain/Sort/Direction";
import { ForwardedRef, MutableRefObject, cloneElement, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";

function AutoGridInner<TItem>(
    {
        service,
        model,
        itemIdProperty,
        experimentalFilter,
        visibleColumns,
        noHeaderFilters,
        customColumns,
        columnOptions,
        rowNumbers,
        ...gridProps
    }: AutoGridProps<TItem>,
    ref: ForwardedRef<AutoGridRef<TItem>>,
): JSX.Element {
    const [internalFilter, setInternalFilter] = useState<AndFilter>({ '@type': 'and', children: [] });
    const gridRef = useRef<GridElement<TItem>>(null);
    const dataProviderFilter = useRef<FilterUnion | undefined>(undefined);

    useImperativeHandle(
        ref,
        () => ({
            get grid() {
                return gridRef.current;
            },
            refresh() {
                gridRef.current?.clearCache();
            },
        }),
        [],
    );

    const setHeaderPropertyFilter = (propertyFilter: PropertyStringFilter) => {
        const filterIndex = internalFilter.children.findIndex(
            (f) => (f as PropertyStringFilter).propertyId === propertyFilter.propertyId,
        );
        let changed = false;
        if (propertyFilter.filterValue === '') {
            // Delete empty filter
            if (filterIndex >= 0) {
                internalFilter.children.splice(filterIndex, 1);
                changed = true;
            }
        } else if (filterIndex >= 0) {
            internalFilter.children[filterIndex] = propertyFilter;
            changed = true;
        } else {
            internalFilter.children.push(propertyFilter);
            changed = true;
        }
        if (changed) {
            setInternalFilter({ ...internalFilter });
        }
    };

    const modelInfo = useMemo(() => new ModelInfo(model, itemIdProperty), [model]);
    const properties = visibleColumns ? modelInfo.getProperties(visibleColumns) : getDefaultProperties(modelInfo);
    const children = useColumns(properties, setHeaderPropertyFilter, {
        visibleColumns,
        noHeaderFilters,
        customColumns,
        columnOptions,
        rowNumbers,
    });

    useEffect(() => {
        // Remove all filtering if header filters are removed
        if (noHeaderFilters) {
            setInternalFilter({ '@type': 'and', children: [] });
        }
    }, [noHeaderFilters]);

    useEffect(() => {
        // Sets the data provider, should be done only once
        const grid = gridRef.current!;
        setTimeout(() => {
            // Wait for the sorting headers to be rendered so that the sorting state is correct for the first data provider call
            grid.dataProvider = createDataProvider(grid, service, dataProviderFilter);
        }, 1);
    }, [model, service]);

    useEffect(() => {
        // Update the filtering, whenever the filter changes
        const grid = gridRef.current;
        if (grid) {
            dataProviderFilter.current = experimentalFilter ?? internalFilter;
            grid.clearCache();
        }
    }, [experimentalFilter, internalFilter]);

    return (
        <Grid itemIdPath={modelInfo.idProperty?.name} {...gridProps} ref={gridRef}>
            {children}
        </Grid>
    );
}

function useColumns(
    properties: PropertyInfo[],
    setPropertyFilter: (propertyFilter: PropertyStringFilter) => void,
    options: ColumnConfigurationOptions,
) {
    const sortableProperties = properties.filter(
        (propertyInfo) => options.columnOptions?.[propertyInfo.name]?.sortable !== false,
    );
    const [sortState, setSortState] = useState<SortState>(
        sortableProperties.length > 0 ? { [sortableProperties[0].name]: { direction: 'asc' } } : {},
    );

    let columns = properties.map((propertyInfo) => {
        let column;

        const customColumnOptions = options.columnOptions ? options.columnOptions[propertyInfo.name] : undefined;

        // Header renderer is effectively the header filter, which should only be
        // applied when header filters are enabled
        const { headerRenderer, ...columnProps } = getColumnOptions(propertyInfo, customColumnOptions);

        if (!options.noHeaderFilters) {
            column = (
                <GridColumnGroup headerRenderer={HeaderSorter}>
                    <GridColumn path={propertyInfo.name} headerRenderer={headerRenderer} {...columnProps}></GridColumn>
                </GridColumnGroup>
            );
        } else {
            column = <GridColumn path={propertyInfo.name} headerRenderer={HeaderSorter} {...columnProps}></GridColumn>;
        }
        return (
            <ColumnContext.Provider
                key={propertyInfo.name}
                value={{
                    propertyInfo,
                    setPropertyFilter,
                    sortState,
                    setSortState,
                    customColumnOptions,
                }}
            >
                {column}
            </ColumnContext.Provider>
        );
    });

    columns = addCustomColumns(columns, options);

    if (options.rowNumbers) {
        columns = [
            <GridColumn key="rownumbers" width="4em" flexGrow={0} renderer={AutoGridRowNumberRenderer}></GridColumn>,
            ...columns,
        ];
    }

    return columns;
}


function addCustomColumns(columns: JSX.Element[], options: ColumnConfigurationOptions): JSX.Element[] {
    if (!options.customColumns) {
        return columns;
    }

    // When using header filters, wrap custom columns into column groups and
    // move header text or renderer to group
    const customColumns = options.noHeaderFilters
        ? options.customColumns
        : options.customColumns.map((column) => {
            const { header, headerRenderer } = column.props;
            const { key } = column;
            const columnWithoutHeader = cloneElement(column, { header: undefined, headerRenderer: undefined });
            return (
                <GridColumnGroup key={key} header={header} headerRenderer={headerRenderer}>
                    {columnWithoutHeader}
                </GridColumnGroup>
            );
        });

    // When using a custom column order, insert custom columns into auto-generated
    // ones using their `key`
    if (options.visibleColumns) {
        const columnMap = [...columns, ...customColumns].reduce((map, column) => {
            const { key } = column;
            if (key) {
                map.set(key, column);
            }
            return map;
        }, new Map<string, JSX.Element>());

        return options.visibleColumns.map((path) => columnMap.get(path)).filter(Boolean) as JSX.Element[];
    }

    // Otherwise just append custom columns at the end
    return [...columns, ...customColumns];
}

interface ColumnConfigurationOptions {
    visibleColumns?: string[];
    noHeaderFilters?: boolean;
    customColumns?: JSX.Element[];
    columnOptions?: Record<string, ColumnOptions>;
    rowNumbers?: boolean;
}


function createDataProvider<TItem>(
    grid: GridElement<TItem>,
    service: ListService<TItem>,
    filter: MutableRefObject<FilterUnion | undefined>,
): GridDataProvider<TItem> {
    let first = true;

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return async (params: GridDataProviderParams<TItem>, callback: GridDataProviderCallback<TItem>) => {
        const sort: Sort = {
            orders: params.sortOrders
                .filter((order) => order.direction != null)
                .map((order) => ({
                    property: order.path,
                    direction: order.direction === 'asc' ? Direction.ASC : Direction.DESC,
                    ignoreCase: false,
                })),
        };

        const pageNumber = params.page;
        const { pageSize } = params;
        const req = {
            pageNumber,
            pageSize,
            sort,
        };

        const items = await service.list(req, filter.current);
        let size;
        if (items.length === pageSize) {
            size = (pageNumber + 1) * pageSize + 1;

            const cacheSize = (grid as GridElementWithInternalAPI<TItem>)._dataProviderController.rootCache.size;
            if (cacheSize !== undefined && size < cacheSize) {
                // Only allow size to grow here to avoid shrinking the size when scrolled down and sorting
                size = undefined;
            }
        } else {
            size = pageNumber * pageSize + items.length;
        }
        callback(items, size);
        if (first) {
            // Workaround for https://github.com/vaadin/react-components/issues/129
            first = false;
            setTimeout(() => grid.recalculateColumnWidths(), 0);
        }
    };
}

type GridElementWithInternalAPI<TItem = GridDefaultItem> = GridElement<TItem> &
    Readonly<{
        _dataProviderController: {
            rootCache: {
                size?: number;
            };
        };
    }>;

// const GridRC = () => {
//     return (
//         <div>
//             <h1>GridRC Component</h1>
//             {/* Add your grid component code here */}
//         </div>
//     );
// };

// export default GridRC;


type GridRC = <TItem>(
    props: AutoGridProps<TItem> & { ref?: ForwardedRef<AutoGridRef<TItem>> },
) => ReturnType<typeof AutoGridInner>;

export const GridRC: GridRC = forwardRef(AutoGridInner) as GridRC;

// export const AutoGrid: AutoGrid = forwardRef(AutoGridInner) as AutoGrid;