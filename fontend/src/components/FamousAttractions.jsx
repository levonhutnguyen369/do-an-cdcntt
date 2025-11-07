"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import placeApi from "@/api/placeApi";

const FamousAttractions = () => {
  const [attractions, setAttractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttractions = async () => {
      setLoading(true);
      const response = await placeApi.getPlaceByType(["SIGHTSEEING"]);
      setAttractions(response.data?.data || response.data);
      setLoading(false);
    };
    fetchAttractions();
  }, []);

  return (
    <section
      id="attractions"
      className="py-20 bg-gradient-to-b from-white to-green-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-4">
            Địa điểm tham quan nổi tiếng
          </h2>
          <p className="text-xl text-gray-600">
            Hành trình qua những địa danh tuyệt đẹp – nơi lưu giữ linh hồn của miền sông nước
          </p>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Đang tải dữ liệu...</p>
        ) : attractions.length === 0 ? (
          <p className="text-center text-gray-500">
            Không có địa điểm nào được tìm thấy.
          </p>
        ) : (
          <Carousel
            className="w-full max-w-5xl mx-auto"
            opts={{
              align: "start",
              slidesToScroll: 1,
              containScroll: "trimSnaps",
            }}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {attractions.map((item) => (
                <CarouselItem
                  key={item.id}
                  className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4"
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <div
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${item.avatar})` }}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {item.address}
                      </p>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 text-sky-600 font-semibold">
                        <Calendar className="w-4 h-4" />
                        {item.city ? item.city : "Miền Tây"}
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </div>
    </section>
  );
};

export default FamousAttractions;
