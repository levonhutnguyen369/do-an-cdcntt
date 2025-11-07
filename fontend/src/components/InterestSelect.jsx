import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const INTERESTS = [
  "Ẩm thực địa phương",
  "Khám phá thiên nhiên",
  "Chụp ảnh & check-in",
  "Văn hóa & lịch sử",
  "Thư giãn nghỉ dưỡng",
  "Mạo hiểm & thể thao",
  "Mua sắm & quà lưu niệm",
  "Hoạt động về đêm",
  "Du lịch sinh thái",
  "Du lịch tâm linh",
];

const InterestSelect = ({ value = [], onChange }) => {
  const [search, setSearch] = useState("");

  const handleToggle = (interest) => {
    const updated = value.includes(interest)
      ? value.filter((i) => i !== interest)
      : [...value, interest];
    onChange(updated);
  };

  const filteredInterests = INTERESTS.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <Label className="text-foreground font-semibold">Sở thích du lịch</Label>

      {/* Ô tìm kiếm sở thích */}
      <Input
        type="text"
        placeholder="Tìm kiếm sở thích..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-input border-border mb-2"
      />

      {/* Danh sách checkbox */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-2 border border-border rounded-md bg-background">
        {filteredInterests.map((interest) => (
          <label
            key={interest}
            className="flex items-center space-x-2 cursor-pointer select-none"
          >
            <Checkbox
              checked={value.includes(interest)}
              onCheckedChange={() => handleToggle(interest)}
            />
            <span className="text-sm text-foreground">{interest}</span>
          </label>
        ))}
        {filteredInterests.length === 0 && (
          <p className="text-sm text-muted-foreground col-span-2 text-center py-2">
            Không tìm thấy sở thích phù hợp
          </p>
        )}
      </div>

      {/* Hiển thị sở thích đã chọn */}
      {value.length > 0 && (
        <p className="text-sm text-muted-foreground mt-2">
          Đã chọn:{" "}
          <span className="text-foreground font-medium">
            {value.join(", ")}
          </span>
        </p>
      )}
    </div>
  );
};

export default InterestSelect;
