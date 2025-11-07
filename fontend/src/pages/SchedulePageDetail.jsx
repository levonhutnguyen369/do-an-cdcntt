import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  ChevronDown,
  Upload,
  X,
  Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import tripApi from "@/api/tripApi";
import scheduleApi from "@/api/scheduleApi";
import { Dialog } from "@headlessui/react"; // hoặc dùng bất kỳ modal nào bạn thích
import DatePicker from "react-datepicker";
import { Edit, Trash } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";
import DailySchedule from "@/components/DailySchedule";
import coverImage from "@/assets/trip-cover.png";

const SchedulePageDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [trip, setTrip] = useState(location.state?.tripDetail || null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const fetchTripDetail = async () => {
    try {
      const response = await tripApi.getById(id);
      setTrip(response.data?.data || response.data);
    } catch (error) {
      console.error("❌ Lỗi khi tải chi tiết chuyến đi:", error);
    }
  };

  useEffect(() => {
    if (id) fetchTripDetail();
  }, [id]);

  if (!trip) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Không tìm thấy lịch trình
          </h1>
          <Link to="/schedule">
            <Button className="bg-sky-500 hover:bg-sky-600 text-white">
              Trở về
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <div className="relative">
        {/* Ảnh cover */}
        <img
          src={coverImage}
          alt="Trip cover"
          className="w-full h-80 object-cover"
        />

        {/* Nút trở về nổi trên ảnh */}
        <Link
          to="/schedule"
          className="absolute top-6 left-6 inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-sm rounded-full shadow-sm text-sky-700 hover:bg-white hover:shadow-md transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Trở về danh sách</span>
        </Link>

        {/* Card đè lên ảnh */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2/3 w-full max-w-4xl px-4 sm:px-6 lg:px-8">
          <Card className="shadow-lg overflow-hidden rounded-2xl">
            {/* Title */}
            <div className="px-8 py-2 bg-white">
              <h1 className="text-3xl font-bold text-gray-900">{trip.name}</h1>
            </div>

            {/* Trip Info */}
            <div className="px-8 py-4 bg-white border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-sky-600" />
                    <span className="text-sm font-semibold text-gray-600">
                      Địa điểm
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {trip.destination || "Chưa cập nhật"}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-amber-600" />
                    <span className="text-sm font-semibold text-gray-600">
                      Thời gian
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {trip.numberOfDays} ngày (
                    {new Date(trip.startDate).toLocaleDateString()} -{" "}
                    {new Date(trip.endDate).toLocaleDateString()})
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-semibold text-gray-600">
                      Chi phí (VNĐ)
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {trip.estimatedCost || 0}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-semibold text-gray-600">
                      Loại chuyến đi
                    </span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {trip.tripType}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Phần nội dung dưới */}
      <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 lg:px-8 mt-56">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Chi tiết lịch trình
        </h2>
        <DailySchedule
          scheduleDays={trip.dailySchedules || []}
          fetchTripDetail={fetchTripDetail}
        />
      </div>
    </main>
  );
};

export default SchedulePageDetail;
