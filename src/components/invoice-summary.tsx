export function InvoiceSummary() {
  return (
    <div className="rounded-lg border border-[#e0e2e7] bg-white p-4 sm:p-6">
      <h3 className="mb-4 text-lg font-semibold">Summary</h3>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span className="text-sm">Total</span>
          <span className="font-medium">€3,030 Incl. VAT</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-[#1eb386]" />
            <span className="ml-2 text-sm font-medium">Deposit No. 2020-04-0006</span>
          </div>
          <div className="ml-4 flex justify-between text-sm">
            <span className="text-[#667085]">Date</span>
            <span>Oct 24, 2019</span>
          </div>
          <div className="ml-4 flex justify-between text-sm">
            <span className="text-[#667085]">Amount</span>
            <span>€300</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center">
            <div className="h-2 w-2 rounded-full bg-[#1eb386]" />
            <span className="ml-2 text-sm font-medium">Partial Payment</span>
          </div>
          <div className="ml-4 flex justify-between text-sm">
            <span className="text-[#667085]">Date</span>
            <span>Oct 26, 2019</span>
          </div>
          <div className="ml-4 flex justify-between text-sm">
            <span className="text-[#667085]">Amount</span>
            <span>€400</span>
          </div>
        </div>

        <div className="pt-4">
          <div className="flex justify-between border-t border-[#e0e2e7] pt-4">
            <span className="text-sm font-medium">Remaining Amount</span>
            <span className="font-medium">€100 Incl. VAT</span>
          </div>
        </div>
      </div>
    </div>
  )
}

