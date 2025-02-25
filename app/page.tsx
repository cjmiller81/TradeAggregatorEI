import { TradeTable } from './components/TradeTable';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212] p-8">
      <div className="max-w-4xl mx-auto">
        <TradeTable />
      </div>
    </div>
  );
}