import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, DollarSign, Trash2, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import tripApi from "@/api/tripApi";


const SchedulePage = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedTrips = localStorage.getItem("tripList");
    if (storedTrips) {
      setTrips(JSON.parse(storedTrips));
    }
  }, []);

  const handleTripClick = async (id) => {
    try {
      const response = await tripApi.getById(id);
      const tripDetail = response.data?.data || response.data;
      navigate(`/schedule/${id}`, { state: { tripDetail } });
    } catch (error) {
      console.error("❌ Lỗi khi lấy chi tiết chuyến đi:", error);
    }
  };

  // ✅ Hàm xóa chuyến đi
  const handleDeleteTrip = async (e, id) => {
    e.stopPropagation(); // tránh click vào card để xem chi tiết
    if (!window.confirm("Bạn có chắc muốn xóa chuyến đi này không?")) return;

    try {
      await tripApi.delete(id);
      const updatedTrips = trips.filter((trip) => trip.id !== id);
      setTrips(updatedTrips);
      localStorage.setItem("tripList", JSON.stringify(updatedTrips));
      console.log("✅ Đã xóa chuyến đi:", id);
    } catch (error) {
      console.error("❌ Lỗi khi xóa chuyến đi:", error);
      alert("Xóa chuyến đi thất bại, vui lòng thử lại!");
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-200 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Lịch trình của tôi
          </h1>
          <p className="text-gray-600">
            Quản lí và xem tất cả chuyến đi của bạn
          </p>
        </div>

        {trips.length > 0 ? (
          <div className="space-y-4">
            {trips.map((trip) => (
              <div
                key={trip.id}
                onClick={() => handleTripClick(trip.id)}
                className="bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow cursor-pointer p-6 flex items-center justify-between"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {trip.name || "Chuyến đi chưa có tên"}
                  </h3>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-sky-600 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        {trip.destination || "N/A"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                      <span className="text-sm text-gray-600">
                        {trip.numberOfDays || 0} ngày
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Wallet className="w-4 h-4 text-gray-800 flex-shrink-0" />
                      <span className="text-sm text-gray-800">
                        {trip.estimatedCost || 0}
                      </span>
                    </div>

                    <div>
                      <span className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-semibold rounded-full">
                        {trip.tripType || "Không rõ"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Nút delete và icon điều hướng */}
                <div className="flex items-center gap-3 ml-4">
                  <Button
                    variant="ghost"
                    className="text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={(e) => handleDeleteTrip(e, trip.id)}
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                  <ArrowRight className="w-5 h-5 text-sky-500 flex-shrink-0" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-gray-600 mb-4">Chưa có lịch trình nào.</p>
            <Link to="/plan">
              <Button className="bg-sky-500 hover:bg-sky-600 text-white">
                Tạo chuyến đi mới
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </main>
  );
};

export default SchedulePage;
