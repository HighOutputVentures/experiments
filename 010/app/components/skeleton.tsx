export const Skeleton = () => {
  return (
    <div
      className="rounded-md p-4 max-w-sm w-full mx-auto"
      style={{
        boxShadow: "-5px -5px 10px #fbfbfb, 5px 5px 4px #eeeeee",
      }}
    >
      <div className="animate-pulse flex flex-col space-x-4 justify-center items-center gap-[30px]">
        <div className="rounded-full bg-slate-400 h-[90px] w-[90px] shadow-xl"></div>
        <div className="flex-1 space-y-6 py-1 w-[200px]">
          <div className="h-2 bg-slate-400 rounded"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-2 bg-slate-400 rounded col-span-2"></div>
            <div className="h-2 bg-slate-400 rounded col-span-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
