import React, { useState } from "react";

export default function App() {
  const [page, setPage] = useState("home");
  const [customers, setCustomers] = useState([
    { id: 1, name: "The Mill", sites: ["Site A", "Site B"] },
    { id: 2, name: "Riseon HQ", sites: ["Main Office"] },
  ]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [selectedSite, setSelectedSite] = useState(null);

  const handleAddCustomer = (e) => {
    e.preventDefault();
    const name = e.target.customerName.value;
    const site = e.target.siteName.value;
    const newCustomer = {
      id: customers.length + 1,
      name,
      sites: [site],
    };
    setCustomers([...customers, newCustomer]);
    e.target.reset();
    setPage("home");
  };

  const renderHome = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Job Report App</h1>
      <div className="space-y-4">
        <button
          onClick={() => setPage("createJob")}
          className="w-full p-3 bg-blue-600 text-white rounded"
        >
          Create Job
        </button>
        <button
          onClick={() => setPage("addCustomer")}
          className="w-full p-3 bg-green-600 text-white rounded"
        >
          Add New Customer
        </button>
      </div>
    </div>
  );

  const renderCreateJob = () => (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Create Job</h2>
      <div className="space-y-4">
        <button
          onClick={() => setPage("callOut")}
          className="w-full p-3 bg-blue-600 text-white rounded"
        >
          Call Out
        </button>
        <button
          onClick={() => setPage("repair")}
          className="w-full p-3 bg-yellow-600 text-white rounded"
        >
          Repair
        </button>
        <button
          onClick={() => setPage("maintenance")}
          className="w-full p-3 bg-purple-600 text-white rounded"
        >
          Maintenance
        </button>
        <button
          onClick={() => setPage("home")}
          className="w-full p-3 bg-gray-500 text-white rounded"
        >
          ⬅ Back
        </button>
      </div>
    </div>
  );

  const renderCallOut = () => {
    if (!selectedCustomer) {
      return (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Select Customer</h2>
          <select
            onChange={(e) =>
              setSelectedCustomer(customers.find((c) => c.id === +e.target.value))
            }
            className="w-full p-3 border rounded mb-4"
          >
            <option value="">-- Select Customer --</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <button
            onClick={() => setPage("createJob")}
            className="w-full p-3 bg-gray-500 text-white rounded"
          >
            ⬅ Back
          </button>
        </div>
      );
    }

    if (!selectedSite) {
      return (
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">
            Select Site for {selectedCustomer.name}
          </h2>
          <select
            onChange={(e) => setSelectedSite(e.target.value)}
            className="w-full p-3 border rounded mb-4"
          >
            <option value="">-- Select Site --</option>
            {selectedCustomer.sites.map((site, i) => (
              <option key={i} value={site}>
                {site}
              </option>
            ))}
          </select>
          <button
            onClick={() => setSelectedCustomer(null)}
            className="w-full p-3 bg-gray-500 text-white rounded"
          >
            ⬅ Back
          </button>
        </div>
      );
    }

    return (
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">
          Call Out Report for {selectedCustomer.name} - {selectedSite}
        </h2>
        <form className="space-y-4">
          <textarea
            placeholder="Describe the issue..."
            className="w-full p-3 border rounded"
          />
          <input
            type="number"
            placeholder="Total hours"
            className="w-full p-3 border rounded"
          />
          <button
            type="submit"
            className="w-full p-3 bg-blue-600 text-white rounded"
          >
            Save Report
          </button>
        </form>
        <button
          onClick={() => {
            setSelectedSite(null);
            setSelectedCustomer(null);
            setPage("createJob");
          }}
          className="w-full p-3 bg-gray-500 text-white rounded mt-4"
        >
          ⬅ Back
        </button>
      </div>
    );
  };

  const renderAddCustomer = () => (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Add New Customer</h2>
      <form onSubmit={handleAddCustomer} className="space-y-4">
        <input
          name="customerName"
          type="text"
          placeholder="Customer name"
          className="w-full p-3 border rounded"
          required
        />
        <input
          name="siteName"
          type="text"
          placeholder="Default site name"
          className="w-full p-3 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-green-600 text-white rounded"
        >
          Add Customer
        </button>
      </form>
      <button
        onClick={() => setPage("home")}
        className="w-full p-3 bg-gray-500 text-white rounded mt-4"
      >
        ⬅ Back
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black">
      {page === "home" && renderHome()}
      {page === "createJob" && renderCreateJob()}
      {page === "callOut" && renderCallOut()}
      {page === "repair" && <div className="p-6">Repair form coming soon</div>}
      {page === "maintenance" && (
        <div className="p-6">Maintenance form coming soon</div>
      )}
      {page === "addCustomer" && renderAddCustomer()}
    </div>
  );
}
