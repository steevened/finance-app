export default function Page() {
  return (
    <div className="w-full lg:grid  lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center h-full p-6">
        {/* <SignUpForm /> */}
      </div>
      <div className="hidden bg-muted lg:block">
        <div className="flex items-center justify-center h-full">
          <h3>Expenses Tracker</h3>
        </div>
      </div>
    </div>
  );
}
