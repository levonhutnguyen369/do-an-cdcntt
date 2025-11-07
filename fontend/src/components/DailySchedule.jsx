import { useState, useEffect } from "react";
import { Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import scheduleApi from "@/api/scheduleApi"; // đường dẫn đúng của bạn
import { Edit, Trash } from "lucide-react";
import TimePicker from "react-time-picker";

export default function DailySchedule({ scheduleDays, fetchTripDetail }) {
  const [expandedDays, setExpandedDays] = useState(new Set());
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDayId, setSelectedDayId] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [places, setPlaces] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    from: "",
    to: "",
    cost: "",
    placeId: "",
    type: "OTHER",
  });

  const toggleDay = (index) => {
    const newExpandedDays = new Set(expandedDays);
    newExpandedDays.has(index)
      ? newExpandedDays.delete(index)
      : newExpandedDays.add(index);
    setExpandedDays(newExpandedDays);
  };
  const handleTimeChange = (date, key) => {
    if (!date) return;

    // Lấy giờ & phút từ object Date
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    // Format thành "HH:mm"
    const timeString = `${hours}:${minutes}`;

    // Lưu chuỗi vào formData
    setFormData({ ...formData, [key]: timeString });
  };

  const [formDataTime, setFormDataTime] = useState({ from: "", to: "" });

  // Tạo danh sách mốc giờ 30 phút
  const times = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hh = String(h).padStart(2, "0");
      const mm = String(m).padStart(2, "0");
      times.push(`${hh}:${mm}`);
    }
  }

  // Lấy danh sách địa điểm
  useEffect(() => {
    const loadPlaces = async () => {
      try {
        const res = await scheduleApi.getPlaces();
        setPlaces(res.data?.data || []);
      } catch (e) {
        console.error("Lỗi load place:", e);
      }
    };
    loadPlaces();
  }, []);

  // Mở form thêm
  const openAddActivityForm = (dayId) => {
    setIsEditing(false);
    setSelectedActivity(null);
    setSelectedDayId(dayId);
    setFormData({
      name: "",
      description: "",
      from: "",
      to: "",
      cost: "",
      placeId: "",
      type: "OTHER",
    });
    setIsOpen(true);
  };

  // Mở form sửa
  const openEditActivityForm = (dayId, activity) => {
    setIsEditing(true);
    setSelectedActivity(activity);
    setSelectedDayId(dayId);
    setFormData({
      id: activity.id,
      name: activity.name,
      description: activity.description,
      dailyScheduleId: activity.dailyScheduleId,
      from: activity.from,
      to: activity.to,
      cost: activity.cost,
      placeId: activity.placeId,
      type: activity.type || "OTHER",
    });
    setIsOpen(true);
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await scheduleApi.updateActivity(
          selectedDayId,
          selectedActivity.id,
          formData
        );
      } else {
        await scheduleApi.addActivity(selectedDayId, formData);
      }
      setIsOpen(false);
      fetchTripDetail(); // reload lại danh sách sau khi thao tác
    } catch (err) {
      console.error("Lỗi khi lưu activity:", err);
    }
  };

  // Xóa hoạt động
  const handleDelete = async () => {
    try {
      await scheduleApi.deleteActivity(selectedDayId, confirmDelete);
      setConfirmDelete(null);
      fetchTripDetail();
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
    }
  };
  const [value, setValue] = useState("06:00");

  return (
    <div className="space-y-6">
      {scheduleDays.map((dayPlan, index) => (
        <div key={index} className="border rounded-lg shadow-sm">
          {/* Header ngày */}
          <div
            className="bg-gray-100 px-6 py-3 cursor-pointer flex justify-between items-center"
            onClick={() => {
              const newSet = new Set(expandedDays);
              newSet.has(index) ? newSet.delete(index) : newSet.add(index);
              setExpandedDays(newSet);
            }}
          >
            <h2 className="font-bold text-gray-800">Ngày {index + 1}</h2>
          </div>

          {/* Nội dung hoạt động */}
          {expandedDays.has(index) && (
            <div className="p-6 space-y-6">
              {dayPlan.activities?.length > 0 ? (
                dayPlan.activities.map((act, actIndex) => (
                  <div
                    key={actIndex}
                    className="flex gap-4 border-b pb-4 justify-between"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 bg-sky-500 rounded-full mt-1.5"></div>
                      {actIndex < dayPlan.activities.length - 1 && (
                        <div className="w-0.5 h-16 bg-sky-200 my-2"></div>
                      )}
                    </div>
                    <div className="pb-4 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="font-semibold text-gray-900">
                          {act.from} - {act.to}
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium">{act.name}</p>
                      <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                        <MapPin className="w-3 h-3" />
                        {act.placeName || "Không rõ địa điểm"}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="text-blue-600 hover:underline text-sm"
                        onClick={() => openEditActivityForm(dayPlan.id, act)}
                      >
                        <Edit className="w-4 h-4" cursor="pointer" />
                      </button>
                      <button
                        className="text-red-600 hover:underline text-sm"
                        onClick={() => {
                          setSelectedDayId(dayPlan.id);
                          setConfirmDelete(act.id);
                        }}
                        cursor="pointer"
                      >
                        <Trash className="w-4 h-4" cursor="pointer" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">Chưa có hoạt động nào.</p>
              )}

              <Button
                className="bg-sky-600 hover:bg-sky-700 text-white"
                onClick={() => openAddActivityForm(dayPlan.id)}
              >
                + Thêm hoạt động
              </Button>
            </div>
          )}
        </div>
      ))}

      {/* Modal Thêm / Sửa */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? "Chỉnh sửa hoạt động" : "Thêm hoạt động mới"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Tên hoạt động"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                required
              />
              <textarea
                placeholder="Mô tả"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
              />
              <select
                value={formData.from}
                onChange={(e) =>
                  setFormData({ ...formData, from: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Chọn giờ bắt đầu</option>
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>

              <select
                value={formData.to}
                onChange={(e) =>
                  setFormData({ ...formData, to: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Chọn giờ kết thúc</option>
                {times.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Chi phí (VNĐ)"
                value={formData.cost}
                onChange={(e) =>
                  setFormData({ ...formData, cost: e.target.value })
                }
                className="w-full border rounded px-3 py-2 "
              />
              <select
                value={formData.placeId}
                onChange={(e) =>
                  setFormData({ ...formData, placeId: e.target.value })
                }
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">-- Chọn địa điểm --</option>
                {places.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>

              <div className="flex justify-end gap-3 pt-3">
                <Button
                  type="button"
                  className="bg-gray-300 text-black hover:bg-gray-400"
                  onClick={() => setIsOpen(false)}
                >
                  Hủy
                </Button>
                <Button type="submit" className="bg-sky-600 text-white hover:bg-sky-700">
                  {isEditing ? "Lưu thay đổi" : "Thêm hoạt động"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal xác nhận xóa */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h3 className="text-lg font-bold mb-4 text-gray-900">
              Xác nhận xóa
            </h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc muốn xóa hoạt động này không?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
