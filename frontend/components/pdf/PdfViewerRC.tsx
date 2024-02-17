import { Dialog } from '@hilla/react-components/Dialog.js';
import { Component } from 'react';
import { FaX } from 'react-icons/fa6';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
).toString();

const options = {
    cMapUrl: '/cmaps/',
    standardFontDataUrl: '/standard_fonts/',
    // httpHeaders: { 'Access-Control-Allow-Origin': '*' },
};

type PDFFile = string | File | null | Promise<number[] | undefined>;

class PdfViewerRC extends Component<{ fileUrl: PDFFile, dialogShow: boolean }> {
    state: {
        numPages: number | null,
        pageNumber: number,
        file: Blob | null,
        dialogShow: boolean,
    } = {
            numPages: null,
            pageNumber: 1,
            file: null,
            dialogShow: false,
        };

    componentDidUpdate(prevProps: Readonly<{ fileUrl: string; dialogShow: boolean; }>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.dialogShow !== this.props.dialogShow) {
            this.setState({ dialogShow: true });
        }
        if (prevProps.fileUrl !== this.props.fileUrl) {
            this.props.fileUrl instanceof Promise && this.props.fileUrl.then((file: any) => {
                // const uint8Array = new Uint8Array(file);
                // const datas = new Blob([new Uint8Array(file)], { type: 'application/pdf' });

                this.setState({ file: new Blob([new Uint8Array(file)], { type: 'application/pdf' }) });
            });
        }
    }

    onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        this.setState({ numPages });
    }

    goToPrevPage = () =>
        this.setState((state: { pageNumber: number }) => ({ pageNumber: state.pageNumber - 1 }));

    goToNextPage = () =>
        this.setState((state: { pageNumber: number }) => ({ pageNumber: state.pageNumber + 1 }));

    render() {
        const { pageNumber, numPages } = this.state;
        return (
            <>
                <Dialog modeless draggable resizable opened={this.state.dialogShow} overlayClass='w-1/2'
                    onOpenedChanged={(event) => {
                        this.setState({ dialogShow: event.detail.value });
                        // setIsOpen(event.detail.value);
                    }}
                    headerRenderer={() => (
                        <>
                            <h2 className="draggable flex-1 cursor-move margin-0 font-bold text-2xl padding-m-0">Report Window</h2>
                            <p className="flex-1 cursor-move margin-0 font-bold text-base padding-m-0" >Page {pageNumber} of {numPages}</p>
                            <button
                                type="button"
                                disabled={pageNumber <= 1}
                                onClick={this.goToPrevPage}
                            >
                                Previous
                            </button>
                            <button
                                type="button"
                                disabled={numPages !== null && pageNumber >= numPages}
                                onClick={this.goToNextPage}
                            >
                                Next
                            </button>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={() => {
                                    this.setState({ dialogShow: false });
                                    // setIsOpen(false);
                                }}>
                                <FaX /> <span className="sr-only">Close</span>
                            </button>
                        </>
                    )}
                    footerRenderer={() => (
                        <>
                            <button type="button" className="border-2 border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white" onClick={() => {
                                // setIsOpen(false);                                
                                this.setState({ dialogShow: false });
                            }}>Cancel</button>
                        </>
                    )}
                >
                    <div>
                        <Document
                            file={this.state.file}
                            options={options}
                            onLoadSuccess={this.onDocumentLoadSuccess}
                            className={'w-full h-full'}
                        >
                            <Page pageNumber={pageNumber} />
                        </Document>
                    </div>
                </Dialog>
            </>

        );
    }
}

export default PdfViewerRC;