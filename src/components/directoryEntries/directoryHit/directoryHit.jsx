export function DirectoryHit({ hit, retrieveDataFromHit }) {
  const handleClick = () => {
    retrieveDataFromHit(hit, false);
  };
  return (
    <div
      onClick={handleClick}
      className="data-record mb-1 p-2 grid grid-cols-5 gap-5 w-full cursor-pointer hover:bg-gray-200"
    >
      <span className="text-sm block w-full font-semibold capitalize">
        {hit.employee}
      </span>
      <span className="text-sm block w-full capitalize">{hit.Department}</span>
      <span className="text-sm block w-full uppercase">{hit.DDivisions}</span>
      <span className="text-sm block w-full ">{hit.roomno}</span>
      <span className="text-sm block w-full ">{hit.extensionno}</span>
    </div>
  );
}
