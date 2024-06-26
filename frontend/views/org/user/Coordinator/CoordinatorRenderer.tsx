
import ImgRC from "Frontend/components/Image/ImgRC";
import InstructorDtoModel from "Frontend/generated/com/itbd/application/dto/user/instructor/InstructorDtoModel";
const CoordinatorRenderer = ({ item }: { item: InstructorDtoModel }) => {
    const { id, person, designation } = item.valueOf();
    const imagePath = `v1/content/image?imagePath=${btoa('/user/' + person?.id + '/temp/100/' + person?.id + '.png')}`;
    // console.log('ImageUrl', imagePath);
    return (
        <>
            <div className="flex items-center gap-4 p-1">
                <ImgRC imageUrl={imagePath} />
                <div className="flex flex-col w-full">
                    <strong className="text-slate-900 text-sm font-medium dark:text-slate-900">{`${person?.givenName}`}</strong>
                    <p className="text-slate-500 text-sm font-medium dark:text-slate-500 truncate w-48">{`#${id} - ${designation}`}</p>
                </div>
            </div>
        </>);
};

export default CoordinatorRenderer;
