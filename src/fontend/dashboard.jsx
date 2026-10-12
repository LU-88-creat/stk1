
import { useEffect, useState } from "react";
import {
  ShoppingCart,
  Package,
  ClipboardList,
  Users,
  Truck,
  LayoutDashboard,
  Plus,
  AlertTriangle,
  ArrowRight,
  Menu,
  X,
  Boxes,
  Receipt,
  LogOut,
} from "lucide-react";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Database data
  const [recentSales, setRecentSales] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);

  // Loading states
  const [salesLoading, setSalesLoading] = useState(true);
  const [stockLoading, setStockLoading] = useState(true);

  // Error states
  const [salesError, setSalesError] = useState("");
  const [stockError, setStockError] = useState("");

  
  // Fetch recent sales from the Node.js / Express API
  useEffect(() => {
    const fetchRecentSales = async () => {
      try {
        setSalesLoading(true);
        setSalesError("");

        const response = await fetch(
          "http://localhost:5175/api/sales/recent"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch recent sales");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid sales data received");
        }

        setRecentSales(data);
      } catch (error) {
        console.error("Sales error:", error);
        setSalesError(
          "Unable to load recent sales. Check that the backend API is running."
        );
      } finally {
        setSalesLoading(false);
      }
    };

    fetchRecentSales();
  }, []);

  // Fetch low-stock products from the Node.js / Express API
  useEffect(() => {
    const fetchLowStockProducts = async () => {
      try {
        setStockLoading(true);
        setStockError("");

        const response = await fetch(
          "http://localhost:5175/api/inventory/low-stock"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch low-stock products");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid inventory data received");
        }

        setLowStockProducts(data);
      } catch (error) {
        console.error("Inventory error:", error);
        setStockError(
          "Unable to load inventory. Check that the backend API is running."
        );
      } finally {
        setStockLoading(false);
      }
    };

    fetchLowStockProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-64 flex-col bg-slate-900 text-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        {/* Logo */}
        <div className="flex h-20 items-center justify-between border-b border-slate-700 px-6">

          <div>
            <h1 className="text-xl font-bold">
              POS Manager
            </h1>

            <p className="text-xs text-slate-400">
              POS & Inventory
            </p>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={22} />
          </button>

        </div>

        {/* Navigation */}
        <nav className="min-h-0 flex-1 overflow-y-auto px-4 py-6">

          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Main
          </p>

          <NavItem
            icon={<LayoutDashboard size={19} />}
            label="Dashboard"
            active
          />

          <p className="mb-3 mt-7 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Point of Sale
          </p>

          <NavItem
            icon={<ShoppingCart size={19} />}
            label="New Sale"
          />

          <NavItem
            icon={<Receipt size={19} />}
            label="Sales"
          />

          <NavItem
            icon={<Users size={19} />}
            label="Customers"
          />

          <p className="mb-3 mt-7 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
            Inventory
          </p>

          <NavItem
            icon={<Package size={19} />}
            label="Products"
          />

          <NavItem
            icon={<Boxes size={19} />}
            label="Stock Management"
          />

          <NavItem
            icon={<ClipboardList size={19} />}
            label="Categories"
          />

          <NavItem
            icon={<Truck size={19} />}
            label="Suppliers"
          />

          <NavItem
            icon={<ClipboardList size={19} />}
            label="Purchases"
          />

        </nav>

        {/* Logout */}
        <div className="mt-auto border-t border-slate-700 p-4">

          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white">
            <LogOut size={19} />
            Logout
          </button>

        </div>

      </aside>

      {/* Main */}
      <main className="lg:ml-64">

        {/* Header */}
        <header className="sticky top-0 z-20 flex h-20 items-center justify-between border-b bg-white px-5 shadow-sm lg:px-8">

          <div className="flex items-center gap-4">

            <button
              className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>

            <div>

              <h2 className="text-xl font-semibold text-gray-800">
                Dashboard
              </h2>

              <p className="hidden text-sm text-gray-500 sm:block">
                Manage your sales and inventory
              </p>

            </div>

          </div>

        </header>

        {/* Content */}
        <div className="p-5 lg:p-8">

          {/* Welcome */}
          <section className="mb-8">

            <h1 className="text-2xl font-bold text-gray-900">
              Dashboard
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your POS and inventory operations.
            </p>

          </section>

          {/* Quick Actions */}
          <section className="mb-8">

            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Quick Actions
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

              <QuickAction
                icon={<ShoppingCart size={25} />}
                title="New Sale"
                description="Start a new transaction"
                color="blue"
              />

              <QuickAction
                icon={<Plus size={25} />}
                title="Add Product"
                description="Add a new product"
                color="green"
              />

              <QuickAction
                icon={<Package size={25} />}
                title="View Inventory"
                description="Manage your stock"
                color="purple"
              />

              <QuickAction
                icon={<Truck size={25} />}
                title="New Purchase"
                description="Record stock purchase"
                color="orange"
              />

            </div>

          </section>

          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

            {/* Recent Sales */}
            <section className="rounded-xl border bg-white shadow-sm xl:col-span-2">

              <div className="flex items-center justify-between border-b px-6 py-5">

                <div>

                  <h3 className="font-semibold text-gray-900">
                    Recent Sales
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Latest POS transactions
                  </p>

                </div>

                <button className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700">
                  View all
                  <ArrowRight size={16} />
                </button>

              </div>

              <div className="overflow-x-auto">

                {salesLoading ? (

                  <div className="p-8 text-center text-sm text-gray-500">
                    Loading sales...
                  </div>

                ) : salesError ? (

                  <div className="p-8 text-center text-sm text-red-500">
                    {salesError}
                  </div>

                ) : recentSales.length === 0 ? (

                  <div className="p-8 text-center text-sm text-gray-500">
                    No sales found.
                  </div>

                ) : (

                  <table className="w-full min-w-[650px]">

                    <thead className="bg-gray-50">

                      <tr className="text-left text-xs uppercase text-gray-500">

                        <th className="px-6 py-4">
                          Invoice
                        </th>

                        <th className="px-6 py-4">
                          Customer
                        </th>

                        <th className="px-6 py-4">
                          Items
                        </th>

                        <th className="px-6 py-4">
                          Amount
                        </th>

                        <th className="px-6 py-4">
                          Payment
                        </th>

                      </tr>

                    </thead>

                    <tbody className="divide-y">

                      {recentSales.map((sale) => (

                        <tr
                          key={sale.id}
                          className="transition hover:bg-gray-50"
                        >

                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {sale.invoice_number}
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-600">
                            {sale.customer_name || "Walk-in Customer"}
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-600">
                            {sale.items_count}
                          </td>

                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            {sale.total}
                          </td>

                          <td className="px-6 py-4">

                            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                              {sale.payment_method}
                            </span>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                )}

              </div>

            </section>

            {/* Low Stock */}
            <section className="rounded-xl border bg-white shadow-sm">

              <div className="flex items-center justify-between border-b px-6 py-5">

                <div>

                  <h3 className="font-semibold text-gray-900">
                    Low Stock
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Products requiring attention
                  </p>

                </div>

                <div className="rounded-lg bg-orange-100 p-2 text-orange-600">
                  <AlertTriangle size={20} />
                </div>

              </div>

              <div>

                {stockLoading ? (

                  <div className="p-8 text-center text-sm text-gray-500">
                    Loading inventory...
                  </div>

                ) : stockError ? (

                  <div className="p-8 text-center text-sm text-red-500">
                    {stockError}
                  </div>

                ) : lowStockProducts.length === 0 ? (

                  <div className="p-8 text-center text-sm text-gray-500">
                    No low-stock products.
                  </div>

                ) : (

                  <div className="divide-y">

                    {lowStockProducts.map((product) => (

                      <div
                        key={product.id}
                        className="flex items-center justify-between px-6 py-4"
                      >

                        <div className="min-w-0">

                          <p className="truncate text-sm font-medium text-gray-800">
                            {product.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {product.product_code}
                          </p>

                        </div>

                        <div className="ml-4 text-right">

                          <p className="text-sm font-semibold text-red-600">
                            {product.quantity}
                          </p>

                          <p className="text-xs text-gray-400">
                            Min: {product.minimum_stock}
                          </p>

                        </div>

                      </div>

                    ))}

                  </div>

                )}

              </div>

              <div className="border-t p-4">

                <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">

                  Manage Inventory

                  <ArrowRight size={16} />

                </button>

              </div>

            </section>

          </div>

          {/* Modules */}
          <section className="mt-8">

            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              POS & Inventory
            </h3>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              <ModuleCard
                icon={<ShoppingCart size={28} />}
                title="Point of Sale"
                description="Process customer purchases, manage transactions and record payments."
                items={[
                  "New Sale",
                  "Sales History",
                  "Customers",
                  "Receipts",
                ]}
              />

              <ModuleCard
                icon={<Package size={28} />}
                title="Inventory Management"
                description="Manage products, stock levels, suppliers and purchases."
                items={[
                  "Products",
                  "Categories",
                  "Stock Management",
                  "Suppliers",
                  "Purchases",
                ]}
              />

            </div>

          </section>

        </div>

      </main>

    </div>
  );
};


/* ==========================================
   Navigation Item
========================================== */

const NavItem = ({ icon, label, active = false }) => {
  return (
    <button
      className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
        active
          ? "bg-blue-600 text-white"
          : "text-slate-300 hover:bg-slate-800 hover:text-white"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
};


/* ==========================================
   Quick Action
========================================== */

const QuickAction = ({
  icon,
  title,
  description,
  color,
}) => {

  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <button className="group rounded-xl border bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${colors[color]}`}
      >
        {icon}
      </div>

      <h4 className="font-semibold text-gray-900">
        {title}
      </h4>

      <p className="mt-1 text-sm text-gray-500">
        {description}
      </p>

      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-600 opacity-0 transition group-hover:opacity-100">
        Open
        <ArrowRight size={15} />
      </div>

    </button>
  );
};


/* ==========================================
   Module Card
========================================== */

const ModuleCard = ({
  icon,
  title,
  description,
  items,
}) => {

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      <div className="flex items-start gap-4">

        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
          {icon}
        </div>

        <div>

          <h4 className="font-semibold text-gray-900">
            {title}
          </h4>

          <p className="mt-1 text-sm leading-6 text-gray-500">
            {description}
          </p>

        </div>

      </div>

      <div className="mt-5 flex flex-wrap gap-2">

        {items.map((item) => (
          <span
            key={item}
            className="rounded-md bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
          >
            {item}
          </span>
        ))}

      </div>

    </div>
  );
};

export default Dashboard;
