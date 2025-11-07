"use client";

/* no local state needed */
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";


const Banner = () => {
  const navigate = useNavigate();
  const { isAuthenticated, openAuthModal } = useAuth();

  const handleStartPlanning = () => {
    if (isAuthenticated) {
      navigate("/plan");
    } else {
      openAuthModal?.();
    }
  }

  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/banner.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto p-4 sm:px-6 lg:px-8 text-center py-8">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
          <Sparkles className="w-4 h-4 text-sky-300" />
          <span className="text-white text-sm font-medium">
            AI-Powered Travel Planning
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
          Hành trình về Đồng bằng sông Cửu Long
        </h1>

        <p className="text-lg md:text-xl text-gray-100 mb-6 max-w-2xl mx-auto">
          Nơi vẻ đẹp sông nước giao hòa cùng công nghệ AI, mang đến cho bạn trải
          nghiệm du lịch cá nhân hóa và trọn vẹn.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-sky-500 hover:bg-sky-600 text-white gap-2"
            onClick={handleStartPlanning}
          >
            Bắt đầu hành trình <ArrowRight className="w-5 h-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 border-white/30 text-white hover:bg-white/20"
          >
            Tìm hiểu thêm
          </Button>
        </div>
      </div>

      {/* Global AuthModal is rendered in the Header component for the landing layout */}
    </section>
  );
};
export default Banner;
