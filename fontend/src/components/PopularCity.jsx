"use client";

import { Card } from "@/components/ui/card";
import { Star, MapPin } from "lucide-react";

const cities = [
  {
    id: 1,
    name: "Cần Thơ",
    country: "Vietnam",
    rating: 4.8,
    reviews: 1987,
    image:
      "https://media.vneconomy.vn/w800/images/upload/2021/07/09/hcmc-apm.jpg",
    description:
      "Thành phố trung tâm miền Tây, nổi tiếng với chợ nổi Cái Răng và sông nước hữu tình.",
  },
  {
    id: 2,
    name: "An Giang",
    country: "Vietnam",
    rating: 4.7,
    reviews: 1564,
    image:
      "https://www.qantas.com/content/dam/travelinsider/images/explore/asia/vietnam/the-best-things-to-do-in-vietnam/mekong-delta-river-boat-vietnam.jpg",
    description:
      "Vùng đất núi non và tâm linh, có núi Sam, rừng tràm Trà Sư và lễ hội Bà Chúa Xứ nổi tiếng.",
  },
  {
    id: 3,
    name: "Bến Tre",
    country: "Vietnam",
    rating: 4.6,
    reviews: 1320,
    image:
      "https://th.bing.com/th/id/R.6224f4687e51d375d2efb166ae21fecf?rik=kN%2f1iXP018Eg2g&pid=ImgRaw&r=0",
    description:
      "Xứ dừa hiền hòa với những con sông, vườn trái cây và làng nghề truyền thống đặc trưng miền Tây.",
  },
  {
    id: 4,
    name: "Kiên Giang",
    country: "Vietnam",
    rating: 4.9,
    reviews: 2410,
    image:
      "https://tse3.mm.bing.net/th/id/OIP.6WsjEz_Mkzzk8sMzM9HWngHaDh?rs=1&pid=ImgDetMain&o=7&rm=3",
    description:
      "Tỉnh ven biển có đảo Phú Quốc xinh đẹp, biển xanh cát trắng và nhiều điểm du lịch sinh thái hấp dẫn.",
  },
];

const PopularCity = () => {
  return (
    <section
      id="cities"
      className="py-20 bg-gradient-to-b from-white to-blue-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-4">
            Các thành phố nổi bật
          </h2>
          <p className="text-xl text-gray-600">
            Khám phá những điểm đến phổ biến nhất Đồng bằng sông Cửu Long
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city) => (
            <Card
              key={city.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            >
              <img
                src={city.image}
                alt={city.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {city.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      {city.country}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{city.description}</p>
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(city.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {city.rating}
                  </span>
                  <span className="text-xs text-gray-500">
                    ({city.reviews})
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
export default PopularCity;
