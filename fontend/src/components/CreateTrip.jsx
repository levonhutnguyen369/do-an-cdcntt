import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import tripApi from "@/api/tripApi";
import { useAuth } from '@/contexts/AuthContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Helper to format date to LocalDateTime string (YYYY-MM-DDTHH:mm:ss)
const formatToLocalDateTime = (dateString) => {
  if (!dateString) return null;
  // Add time component (default to start/end of day)
  const isEndDate = dateString.includes('endDate');
  const time = isEndDate ? 'T23:59:59' : 'T00:00:00';
  return `${dateString}${time}`;
};

const DESTINATIONS = [
  { value: "can-tho", label: "Cần Thơ" },
  { value: "an-giang", label: "An Giang" },
  { value: "dong-thap", label: "Đồng Tháp" },
  { value: "ben-tre", label: "Bến Tre" },
  { value: "tra-vinh", label: "Trà Vinh" },
  { value: "soc-trang", label: "Sóc Trăng" },
  { value: "bac-lieu", label: "Bạc Liêu" },
  { value: "ca-mau", label: "Cà Mau" },
  { value: "kien-giang", label: "Kiên Giang" },
  { value: "hau-giang", label: "Hậu Giang" },
  { value: "long-an", label: "Long An" },
  { value: "tien-giang", label: "Tiền Giang" },
  { value: "vinh-long", label: "Vĩnh Long" },
];

const TRAVEL_TYPES = [
  { value: "adventure", label: "Phiêu lưu & khám phá" },
  { value: "cultural", label: "Văn hoá & lịch sử" },
  { value: "relaxation", label: "Nghỉ dưỡng & biển" },
  { value: "food", label: "Ẩm thực & món ngon" },
  { value: "family", label: "Du lịch gia đình" },
  { value: "luxury", label: "Du lịch cao cấp" },
  { value: "budget", label: "Du lịch tiết kiệm" },
  { value: "mixed", label: "Trải nghiệm kết hợp" },
];


const CreateTrip = ({ onClose }) => {
  const { openAuthModal } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    startDate: "",
    endDate: "",
    tripType: "",
    estimatedCost: "",
    destination: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (
      !formData.name ||
      !formData.destination ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.tripType ||
      !formData.estimatedCost
    ) {
      alert("Vui lòng điền vào tất cả các trường");
      return;
    }

    // Validate dates
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (endDate <= startDate) {
      alert("Ngày kết thúc phải sau ngày bắt đầu");
      return;
    }

    // Show success message
    setServerError('');
    setSubmitting(true);

    // Format dates for backend (LocalDateTime)
    const formattedData = {
      ...formData,
      startDate: formatToLocalDateTime(formData.startDate),
      endDate: formatToLocalDateTime(formData.endDate)
    };

    // Call API to create trip
    try {
      // Debug: log current token used by axios interceptor
      console.debug('CreateTrip - token in storage:', localStorage.getItem('token'));
      console.debug('Sending trip data:', formattedData);
      const res = await tripApi.create(formattedData);
      console.log("Tạo chuyến đi thành công:", res.data);
      alert("Thêm chuyến đi mới thành công!");
      setSubmitted(true);
      setSubmitting(false);
    } catch (error) {
      console.error("Lỗi khi tạo chuyến đi:", error);
      // If axios response indicates unauthorized, prompt login
      const status = error?.response?.status;
      const message = error?.response?.data?.message || error.message || 'Lỗi khi tạo chuyến đi';
      setServerError(message);
      setSubmitting(false);
      if (status === 401) {
        // Session expired or token invalid - open login modal
        console.warn('CreateTrip: Unauthorized (401) - opening login modal');
        try {
          openAuthModal();
        } catch {
          // fallback: redirect to login
          window.location.href = '/login';
        }
        return;
      }
    }

    // Log the itinerary data
    console.log("Lịch trình đã được tạo:", formData);

    // Reset form after 2 seconds
    setTimeout(() => {
      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        tripType: "",
        estimatedCost: "",
        destination: "",
      });
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
            <svg
              className="w-8 h-8 text-accent-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Đã tạo lịch trình thành công!
        </h3>
        <p className="text-muted-foreground mb-4">
          Kế hoạch du lịch cá nhân của bạn đã được tạo thành công.
        </p>
        <p className="text-sm text-muted-foreground">Đang chuyển hướng bạn trở lại...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          Tạo hành trình của bạn
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Trip Name */}
      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground font-semibold">
          Tên chuyến đi
        </Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Nhập tên chuyến đi"
          className="bg-input border-border"
          required
        />
      </div>

      {/* Destination Selection */}
      <div className="space-y-2">
        <Label htmlFor="destination" className="text-foreground font-semibold">
          Điểm đến
        </Label>
        <Select
          value={formData.destination}
          onValueChange={(value) => handleSelectChange("destination", value)}
        >
          <SelectTrigger id="destination" className="bg-input border-border">
            <SelectValue placeholder="Chọn điểm đến" />
          </SelectTrigger>
          <SelectContent>
            {DESTINATIONS.map((dest) => (
              <SelectItem key={dest.value} value={dest.value}>
                {dest.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Start Date */}
      <div className="space-y-2">
        <Label htmlFor="startDate" className="text-foreground font-semibold">
          Ngày bắt đầu
        </Label>
        <Input
          id="startDate"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleInputChange}
          className="bg-input border-border"
          required
        />
      </div>

      {/* End Date */}
      <div className="space-y-2">
        <Label htmlFor="endDate" className="text-foreground font-semibold">
          Ngày kết thúc
        </Label>
        <Input
          id="endDate"
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleInputChange}
          className="bg-input border-border"
          required
        />
      </div>

      {/* Travel Type */}
      <div className="space-y-2">
        <Label htmlFor="tripType" className="text-foreground font-semibold">
          Loại hình du lịch
        </Label>
        <Select
          value={formData.tripType}
          onValueChange={(value) => handleSelectChange("tripType", value)}
        >
          <SelectTrigger id="tripType" className="bg-input border-border">
            <SelectValue placeholder="Loại hình du lịch" />
          </SelectTrigger>
          <SelectContent>
            {TRAVEL_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Estimated Cost */}
      <div className="space-y-2">
        <Label
          htmlFor="estimatedCost"
          className="text-foreground font-semibold"
        >
          Chi phí ước tính (VND)
        </Label>
        <Input
          id="estimatedCost"
          type="number"
          name="estimatedCost"
          placeholder="e.g., 2000"
          value={formData.estimatedCost}
          onChange={handleInputChange}
          className="bg-input border-border"
          min="0"
          step="100"
          required
        />
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4">
        {serverError && (
          <div className="w-full text-sm text-red-500">{serverError}</div>
        )}
        <Button
          type="submit"
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2"
          disabled={submitting}
        >
          {submitting ? 'Đang gửi...' : 'Tạo hành trình'}
        </Button>
        <Button
          type="button"
          onClick={onClose}
          variant="outline"
          className="flex-1 border-border text-foreground hover:bg-secondary bg-transparent"
        >
          Hủy
        </Button>
      </div>
    </form>
  );
};
export default CreateTrip;
