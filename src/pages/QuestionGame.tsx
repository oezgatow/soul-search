import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, CheckCircle, XCircle, Eye, EyeOff, Lightbulb } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const QuestionGame = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const profile = location.state?.profile;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  // Sample questions for the profile
  const questions = [
    {
      question: "What's the most important lesson life has taught you?",
      correctAnswer: "authenticity",
      hints: ["It's about being true to yourself", "Starts with 'a'", "12 letters long"]
    },
    {
      question: "If you could master any art form instantly, which would you choose?",
      correctAnswer: "watercolor",
      hints: ["It's a painting technique", "Uses water", "Often transparent"]
    },
    {
      question: "What makes you feel most understood?",
      correctAnswer: "deep conversations",
      hints: ["It involves talking", "More than surface level", "Two words"]
    },
    {
      question: "What's something you've created that you're proud of?",
      correctAnswer: "poetry",
      hints: ["It's written art", "Often rhymes", "Expresses emotions"]
    }
  ];

  const [hintsUsed, setHintsUsed] = useState<number[]>([]);
  const [showHint, setShowHint] = useState(false);

  const checkAnswer = () => {
    const correct = currentAnswer.toLowerCase().includes(questions[currentQuestion].correctAnswer.toLowerCase());
    const newAnswers = [...answers, currentAnswer];
    setAnswers(newAnswers);
    
    if (correct) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setCurrentAnswer("");
        setShowResult(false);
        setShowHint(false);
      } else {
        setGameComplete(true);
      }
    }, 2000);
  };

  const useHint = () => {
    if (!hintsUsed.includes(currentQuestion)) {
      setHintsUsed([...hintsUsed, currentQuestion]);
      setShowHint(true);
    }
  };

  const calculateFinalScore = () => {
    return Math.round((score / questions.length) * 100);
  };

  const handleGameComplete = () => {
    const finalScore = calculateFinalScore();
    const threshold = profile?.revealThreshold || 75;
    
    if (finalScore >= threshold) {
      navigate("/match-reveal", { state: { profile, score: finalScore, success: true } });
    } else {
      navigate("/discovery"); // Back to discovery if failed
    }
  };

  if (!profile) {
    navigate("/discovery");
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigate("/discovery")}>
          <ArrowLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-xl font-semibold">Mystery Challenge</h1>
        <Badge variant="secondary" className="bg-gradient-mystery text-white">
          {currentQuestion + 1}/{questions.length}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-8">
        <div 
          className="bg-gradient-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestion + (gameComplete ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      {!gameComplete ? (
        <>
          {/* Profile Info */}
          <Card className="bg-gradient-mystery text-white border-0 mb-6">
            <CardContent className="p-4 text-center">
              <h2 className="font-bold">{profile.anonymousName}</h2>
              <p className="text-white/80 text-sm">
                Need {profile.revealThreshold}% correct to reveal photo
              </p>
              <div className="flex justify-center gap-4 mt-2">
                <span className="text-sm">Score: {score}/{questions.length}</span>
                <span className="text-sm">Current: {Math.round((score / questions.length) * 100)}%</span>
              </div>
            </CardContent>
          </Card>

          {/* Question Card */}
          <Card className="bg-gradient-card border-0 shadow-soft mb-6">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold leading-relaxed">
                  {questions[currentQuestion].question}
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={useHint}
                  disabled={hintsUsed.includes(currentQuestion)}
                  className="ml-4"
                >
                  <Lightbulb className="w-4 h-4" />
                </Button>
              </div>

              {showHint && (
                <Card className="bg-gradient-reveal border-0 mb-4">
                  <CardContent className="p-4">
                    <p className="text-white text-sm">
                      💡 Hint: {questions[currentQuestion].hints[0]}
                    </p>
                  </CardContent>
                </Card>
              )}

              <div className="space-y-4">
                <Input
                  placeholder="Type your answer..."
                  value={currentAnswer}
                  onChange={(e) => setCurrentAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && currentAnswer && checkAnswer()}
                  disabled={showResult}
                  className="text-lg"
                />

                <Button 
                  variant="romantic" 
                  size="lg" 
                  onClick={checkAnswer}
                  disabled={!currentAnswer || showResult}
                  className="w-full"
                >
                  Submit Answer
                </Button>
              </div>

              {/* Result Display */}
              {showResult && (
                <div className="mt-4 p-4 rounded-lg text-center animate-fade-in">
                  {currentAnswer.toLowerCase().includes(questions[currentQuestion].correctAnswer.toLowerCase()) ? (
                    <div className="text-success">
                      <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-semibold">Correct!</p>
                      <p className="text-sm text-muted-foreground">
                        Answer: {questions[currentQuestion].correctAnswer}
                      </p>
                    </div>
                  ) : (
                    <div className="text-destructive">
                      <XCircle className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-semibold">Not quite right</p>
                      <p className="text-sm text-muted-foreground">
                        Looking for: {questions[currentQuestion].correctAnswer}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Score Summary */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-4">
              <h4 className="font-semibold mb-2">Progress</h4>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Correct: {score}</span>
                <span>Remaining: {questions.length - currentQuestion - 1}</span>
                <span>Target: {profile.revealThreshold}%</span>
              </div>
            </CardContent>
          </Card>
        </>
      ) : (
        /* Game Complete Screen */
        <div className="text-center space-y-6 animate-fade-in">
          <Card className="bg-gradient-mystery text-white border-0">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Challenge Complete!</h2>
              <div className="text-4xl font-bold mb-2">{calculateFinalScore()}%</div>
              <p className="text-white/80">
                You got {score} out of {questions.length} questions correct
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-4">Your Answers:</h3>
              <div className="space-y-2">
                {answers.map((answer, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs">
                      {index + 1}
                    </Badge>
                    <span className="text-muted-foreground">{answer}</span>
                    {answer.toLowerCase().includes(questions[index].correctAnswer.toLowerCase()) ? (
                      <CheckCircle className="w-4 h-4 text-success" />
                    ) : (
                      <XCircle className="w-4 h-4 text-destructive" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button 
            variant="romantic" 
            size="lg" 
            onClick={handleGameComplete}
            className="w-full"
          >
            {calculateFinalScore() >= (profile.revealThreshold || 75) ? (
              <>
                <Eye className="w-4 h-4 mr-2" />
                Reveal Match!
              </>
            ) : (
              <>
                <EyeOff className="w-4 h-4 mr-2" />
                Back to Discovery
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default QuestionGame;