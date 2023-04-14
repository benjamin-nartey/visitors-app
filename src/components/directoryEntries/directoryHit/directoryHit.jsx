export function DirectoryHit({ hit, retrieveDataFromHit }) {
  const handleClick = () => {
    retrieveDataFromHit(hit, false);
  };
  return (
    <div
      onClick={handleClick}
      className="data-record flex justify-start gap-6 py-1 px-2 mb-3 w-full cursor-pointer hover:bg-gray-200"
    >
      <span className="text-sm font-semibold capitalize">{hit.employee}</span>
      <span className="text-sm capitalize">{hit.Department}</span>
      <span className="text-sm uppercase">{hit.DDivisions}</span>
      <span className="text-sm">{hit.roomno}</span>
    </div>
  );
}
