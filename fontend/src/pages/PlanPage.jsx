import { useState } from "react";
import Header from "@/layouts/components/Header";
import Footer from "@/layouts/components/Footer/Footer";
import CreateTrip from "@/components/CreateTrip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import tripApi from "@/api/tripApi"; // cần có hàm generateByAI()
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import CreateTripAI from "@/components/CreateTripAI";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PlanPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [showAIForm, setShowAIForm] = useState(false);
  const [aiForm, setAiForm] = useState({
    destination: "",
    startDate: "",
    endDate: "",
    numberOfPeople: 1,
    estimatedCost: "",
    interests: [],
    tripType: "FAMILY",
  });

  const navigate = useNavigate();

  const handleGenerateAITrip = async () => {
    try {
      const response = await tripApi.generateByAI(aiForm);
      const newTrip = response.data?.data || response.data;
      navigate(`/schedule/${newTrip.id}`, { state: { tripDetail: newTrip } });
    } catch (error) {
      console.error("❌ Lỗi tạo chuyến đi bằng AI:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 via-sky-100 to-white">
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Hành trình này là của riêng bạn
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Tạo một hành trình cá nhân phù hợp với phong cách và sở thích du
              lịch của bạn
            </p>

            {!showForm && !showAIForm && (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button
                  onClick={() => setShowForm(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Bắt đầu nào 🧭
                </Button>

                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10 px-8 py-3 rounded-lg font-semibold"
                  onClick={() => setShowAIForm(true)}
                >
                  Tạo với AI 🤖
                </Button>
              </div>
            )}
          </div>

          {/* Form thủ công */}
          {showForm && (
            <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
              <CreateTrip onClose={() => setShowForm(false)} />
            </div>
          )}

          {/* Form tạo bằng AI */}
          {showAIForm && (
            <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
              <CreateTripAI onClose={() => setShowAIForm(false)} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default PlanPage;
