'use client';

import { PromptTextarea } from '@/components/prompt-textarea/prompt-textarea';
import { Suggestion } from '@/components/prompt-textarea/suggestion';

const Page = () => {
  const suggestions = [
    {
      prompt:
        'Crea un quiz sobre los phrasal verbs más comunes del inglés en el nivel B1',
      description: 'Quiz sobre los phrasal verbs'
    },
    {
      prompt: 'Crea un quiz sobre el vocabulario necesario para pedir un café',
      description: 'Quiz sobre el vocabulario para pedir un café'
    },
    {
      prompt:
        'Crea un quiz sobre el pasado simple del inglés en el nivel B1, con el vocabulario necesario para alquilar un libro en una biblioteca',
      description: 'Quiz sobre el pasado simple'
    }
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-65px)] px-6 xl:px-0">
      <div className="max-w-[768px] w-full mx-auto h-full flex flex-col justify-center gap-[40px]">
        <div className="w-full mb-4 space-y-2">
          <span className="text-sm text-brand-green-600 font-bold">
            Aprende idiomas con Quizzy
          </span>
          <h1 className="text-4xl md:text-[36px] font-bold">¿Qué quieres aprender hoy?</h1>
        </div>

        <div className="flex flex-col gap-4">
          <PromptTextarea />

          <div className="flex flex-wrap gap-2">
            {suggestions.map(suggestion => (
              <Suggestion
                key={suggestion.prompt}
                onClick={() => {
                  console.log(suggestion.prompt);
                }}
                {...suggestion}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
