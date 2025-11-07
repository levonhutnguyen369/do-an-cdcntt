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
import InterestSelect from "@/components/InterestSelect"; // ✅ component mới cho chọn nhiều sở thích

// Helper để format LocalDateTime cho backend
const formatToLocalDateTime = (dateString) => {
  if (!dateString) return null;
  const time = dateString.includes('endDate') ? 'T23:59:59' : 'T00:00:00';
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
    interests: [], // ✅ thêm sở thích
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  // xử lý input thường
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // xử lý select 1 giá trị
  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // xử lý select nhiều sở thích
  const handleInterestsChange = (selected) => {
    setFormData((prev) => ({ ...prev, interests: selected }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.destination ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.tripType ||
      !formData.estimatedCost
    ) {
      alert("Vui lòng điền vào tất cả các trường");
      return;
    }

    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);
    if (endDate <= startDate) {
      alert("Ngày kết thúc phải sau ngày bắt đầu");
      return;
    }

    setServerError('');
    setSubmitting(true);

    const formattedData = {
      destination: formData.destination,
      startDate: formatToLocalDateTime(formData.startDate),
      endDate: formatToLocalDateTime(formData.endDate),
      tripType: formData.tripType,
      estimatedCost: formData.estimatedCost,
      interests: formData.interests,
    };

    try {
      console.debug("Sending AI trip request:", formattedData);
      const res = await tripApi.createWithAI(formattedData); // ✅ gọi API AI
      console.log("✅ Tạo chuyến đi AI thành công:", res.data);

      alert("Đã tạo lịch trình AI thành công!");
      setSubmitted(true);
      setSubmitting(false);
    } catch (error) {
      console.error("❌ Lỗi khi tạo chuyến đi AI:", error);
      const status = error?.response?.status;
      const message = error?.response?.data?.message || error.message || 'Lỗi khi tạo chuyến đi';
      setServerError(message);
      setSubmitting(false);

      if (status === 401) {
        try {
          openAuthModal();
        } catch {
          window.location.href = '/login';
        }
        return;
      }
    }

    setTimeout(() => {
      setFormData({
        name: "",
        startDate: "",
        endDate: "",
        tripType: "",
        estimatedCost: "",
        destination: "",
        interests: [],
      });
      setSubmitted(false);
      onClose();
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
          <svg className="w-8 h-8 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Đã tạo lịch trình thành công!</h3>
        <p className="text-muted-foreground mb-4">Hệ thống AI đã tự động gợi ý kế hoạch du lịch cho bạn.</p>
        <p className="text-sm text-muted-foreground">Đang quay lại...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* tiêu đề */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Tạo hành trình bằng AI</h2>
        <button
          type="button"
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          ✕
        </button>
      </div>

      {/* điểm đến */}
      <div className="space-y-2">
        <Label htmlFor="destination" className="font-semibold">Điểm đến</Label>
        <Select
          value={formData.destination}
          onValueChange={(value) => handleSelectChange("destination", value)}
        >
          <SelectTrigger id="destination">
            <SelectValue placeholder="Chọn điểm đến" />
          </SelectTrigger>
          <SelectContent>
            {DESTINATIONS.map((dest) => (
              <SelectItem key={dest.value} value={dest.value}>{dest.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* thời gian */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startDate">Ngày bắt đầu</Label>
          <Input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">Ngày kết thúc</Label>
          <Input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} />
        </div>
      </div>

      {/* loại hình du lịch */}
      <div className="space-y-2">
        <Label htmlFor="tripType">Loại hình du lịch</Label>
        <Select
          value={formData.tripType}
          onValueChange={(value) => handleSelectChange("tripType", value)}
        >
          <SelectTrigger id="tripType">
            <SelectValue placeholder="Chọn loại hình" />
          </SelectTrigger>
          <SelectContent>
            {TRAVEL_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* chọn nhiều sở thích */}
      <InterestSelect value={formData.interests} onChange={handleInterestsChange} />

      {/* chi phí */}
      <div className="space-y-2">
        <Label htmlFor="estimatedCost">Chi phí ước tính (VND)</Label>
        <Input
          id="estimatedCost"
          type="number"
          name="estimatedCost"
          placeholder="Ví dụ: 2000000"
          value={formData.estimatedCost}
          onChange={handleInputChange}
          min="0"
          step="100"
        />
      </div>

      {/* submit */}
      <div className="flex gap-3 pt-4">
        {serverError && <div className="text-red-500 text-sm">{serverError}</div>}
        <Button type="submit" className="flex-1" disabled={submitting}>
          {submitting ? 'Đang tạo...' : 'Tạo hành trình với AI'}
        </Button>
        <Button type="button" variant="outline" onClick={onClose} className="flex-1">
          Hủy
        </Button>
      </div>
    </form>
  );
};

export default CreateTrip;
