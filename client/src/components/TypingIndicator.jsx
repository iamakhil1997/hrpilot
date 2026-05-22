export default function TypingIndicator() {
  return (
    <div className="flex gap-1.5 items-center py-1 px-0.5" aria-label="HRPilot is thinking">
      <span 
        className="w-1.5 h-1.5 rounded-full bg-indigo-custom dot-bounce select-none" 
        style={{ animationDelay: '0s' }} 
      />
      <span 
        className="w-1.5 h-1.5 rounded-full bg-indigo-custom dot-bounce select-none" 
        style={{ animationDelay: '0.22s' }} 
      />
      <span 
        className="w-1.5 h-1.5 rounded-full bg-indigo-custom dot-bounce select-none" 
        style={{ animationDelay: '0.44s' }} 
      />
    </div>
  );
}
