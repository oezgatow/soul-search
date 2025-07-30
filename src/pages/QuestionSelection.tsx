import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionSelection = () => {
  const navigate = useNavigate();
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [revealThreshold, setRevealThreshold] = useState(75);

  const questionCategories = [
    {
      category: "Values & Philosophy",
      questions: [
        "What's the most important lesson life has taught you?",
        "If you could change one thing about the world, what would it be?",
        "What does success mean to you personally?",
        "What's a belief you hold that others might find surprising?"
      ]
    },
    {
      category: "Creativity & Expression", 
      questions: [
        "If you could master any art form instantly, which would you choose?",
        "What's something you've created that you're proud of?",
        "How do you express yourself when words aren't enough?",
        "What's a creative project you've always wanted to try?"
      ]
    },
    {
      category: "Deep Connections",
      questions: [
        "What's something you've never told anyone?",
        "What makes you feel most understood?",
        "What's a moment when you felt truly alive?",
        "What do you value most in a friendship?"
      ]
    },
    {
      category: "Dreams & Aspirations",
      questions: [
        "What's a dream you're afraid to pursue?",
        "Where do you see yourself in 10 years?",
        "What adventure is on your bucket list?",
        "What legacy do you want to leave behind?"
      ]
    }
  ];

  const handleQuestionToggle = (question: string) => {
    if (selectedQuestions.includes(question)) {
      setSelectedQuestions(selectedQuestions.filter(q => q !== question));
    } else if (selectedQuestions.length < 4) {
      setSelectedQuestions([...selectedQuestions, question]);
    }
  };

  const isQuestionSelected = (question: string) => selectedQuestions.includes(question);

  const handleContinue = () => {
    if (selectedQuestions.length === 4) {
      navigate("/discovery");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/avatar-creation")}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-semibold">Choose Questions</h1>
        <div className="text-sm text-muted-foreground">{selectedQuestions.length}/4</div>
      </div>

      <div className="space-y-6">
        {/* Instructions */}
        <Card className="bg-gradient-mystery text-white border-0">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-2">Your Mystery Questions</h2>
            <p className="text-white/90 mb-4">
              Choose 4 questions that reveal your personality. Others must answer {revealThreshold}% correctly to see your photo.
            </p>
            
            {/* Threshold Selector */}
            <div className="flex justify-center gap-2">
              {[25, 50, 75, 100].map((threshold) => (
                <Button
                  key={threshold}
                  variant={revealThreshold === threshold ? "reveal" : "outline"}
                  size="sm"
                  onClick={() => setRevealThreshold(threshold)}
                  className={revealThreshold !== threshold ? "border-white text-white hover:bg-white hover:text-primary" : ""}
                >
                  {threshold}%
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Question Categories */}
        {questionCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
              {category.category}
              {selectedQuestions.some(q => category.questions.includes(q)) && (
                <Badge variant="secondary" className="bg-gradient-primary text-white">
                  {category.questions.filter(q => selectedQuestions.includes(q)).length} selected
                </Badge>
              )}
            </h3>
            
            <div className="space-y-2">
              {category.questions.map((question, questionIndex) => (
                <Card 
                  key={questionIndex}
                  className={`cursor-pointer transition-all duration-300 border-0 ${
                    isQuestionSelected(question) 
                      ? 'bg-gradient-primary text-white shadow-hover' 
                      : 'bg-gradient-card shadow-soft hover:shadow-hover'
                  } ${selectedQuestions.length >= 4 && !isQuestionSelected(question) ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleQuestionToggle(question)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <p className={`text-sm leading-relaxed ${isQuestionSelected(question) ? 'text-white' : 'text-foreground'}`}>
                        {question}
                      </p>
                      {isQuestionSelected(question) && (
                        <Check className="w-5 h-5 text-white ml-3 flex-shrink-0" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* Selected Questions Summary */}
        {selectedQuestions.length > 0 && (
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Your Selected Questions:</h3>
              <div className="space-y-2">
                {selectedQuestions.map((question, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <p className="text-sm text-muted-foreground">{question}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Continue Button */}
      <div className="fixed bottom-4 left-4 right-4">
        <Button 
          variant="romantic" 
          size="lg" 
          onClick={handleContinue}
          disabled={selectedQuestions.length !== 4}
          className="w-full"
        >
          Start Discovering Matches
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="h-20" /> {/* Spacer for fixed button */}
    </div>
  );
};

export default QuestionSelection;