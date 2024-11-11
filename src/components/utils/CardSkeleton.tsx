/* eslint-disable no-plusplus */
interface Props {
  number: number;
}
const CardSkeleton = ({ number }: Props) => {
  const items = [];

  for (let i = 0; i < number; i++) {
    items.push(
      <div key={i}>
        {" "}
        <div className="flex items-center justify-between pt-4">
          <div>
            <div className="mb-2.5 h-3.5 w-24 rounded-full bg-gray-300 "></div>
            <div className="h-2.5 w-32 rounded-full bg-gray-200"></div>
          </div>
          <div>
            <div className="mb-3.5 h-3.5 w-24 rounded-full bg-gray-300 "></div>
            <div className="h-2.5 w-32 rounded-full bg-gray-200"></div>
          </div>
          <div className="h-3.5 w-12 rounded-full bg-gray-300"></div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div
        role="status"
        className=" animate-pulse space-y-4 divide-y divide-gray-200 rounded border border-gray-200 p-4 md:p-6"
      >
        {items}
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default CardSkeleton;
