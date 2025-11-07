import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import placeApi from "@/api/placeApi";

const PopularFood = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await placeApi.getPlaceByType(["RESTAURANT"]);
      setPlaces(response.data?.data || response.data);
    };
    fetchPlaces();
  }, []);

  return (
    <section id="food" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-4xl font-bold text-gray-900 mb-4">
            Ẩm thực & Địa điểm nổi bật
          </h2>
          <p className="text-xl text-gray-600">
            Khám phá hương vị và cảnh đẹp đậm chất miền Tây.
          </p>
        </div>

        <Carousel
          className="w-full max-w-5xl mx-auto"
          opts={{
            align: "start",
            slidesToScroll: 1,
            containScroll: "trimSnaps",
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {places.map((place) => (
              <CarouselItem
                key={place.id}
                className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/4"
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                  <div
                    className="h-40 bg-cover bg-center"
                    style={{ backgroundImage: `url(${place.avatar})` }}
                  />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          {place.name}
                        </h3>
                        <p className="text-sm text-gray-600">{place.address}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {place.description}
                    </p>
                    <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                      <DollarSign className="w-4 h-4" />
                      {place.type === "RESTAURANT" ? "Ẩm thực" : "Tham quan"}
                    </div>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default PopularFood;
