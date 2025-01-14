import BookingTable from "@/components/BookingTable";
import PnrSearchForm from "@/components/PnrSearchForm";


export default function Home() {
  return (
    <div className="p-8">
      <div>
      <PnrSearchForm/>
      </div>
      <div className="border my-2">
        <BookingTable/>
      </div>
    </div>
  );
}
