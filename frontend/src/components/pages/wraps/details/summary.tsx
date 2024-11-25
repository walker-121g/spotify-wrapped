import { useQuery } from "@tanstack/react-query";

import { getWrapInfo } from "@/services/wrap.service";
import { getGeminiStory } from "@/services/gemini.service";

import { Info, Loader2 } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Wrap } from "@/services/types/wrap";
import { Button } from "@/components/ui/button";

export const WrapSummary = ({ wrap }: { wrap: Wrap }) => {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["wrap", "spotify", wrap.id],
    queryFn: async () => await getWrapInfo(wrap),
  });

  const {
    isLoading: aiLoading,
    isError: aiError,
    data: summary,
  } = useQuery({
    queryKey: ["wrap", "summary", wrap.id],
    queryFn: async () =>
      await getGeminiStory(
        `
        Respond to the following prompt where '***' represents a line break and '_' surrounds text that should be bold. Add no other formatting.
        Given the following Spotify Wrap JSON data, curate an AI summary that explains what the listeners music tastes mean. Make a prediction about astrology signs, listening mood, and other artists the listener might like.
        WRAP: ${JSON.stringify(wrap)},
        SPOTIFY_INFO: ${JSON.stringify(data!)}`,
      ),
    enabled: !isLoading && !isError && data !== undefined,
  });

  if (isLoading || aiLoading) {
    return (
      <div className="w-full flex flex-col gap-2">
        <div className="w-full flex flex-row items-center gap-2">
          <h1 className="text-text text-md font-semibold">AI Summary</h1>
        </div>
        <div className="w-full flex flex-row items-center justify-center my-8">
          <Loader2 className="animate-spin" />
        </div>
      </div>
    );
  }

  if (isError || aiError || !data || !summary) {
    return <></>;
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full flex flex-row items-center gap-2">
        <h1 className="text-text text-md font-semibold">AI Summary</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Wrapped uses Google Gemini to create an AI summary of your wrap.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="w-full flex flex-col gap-2">
        {(summary as string)
          .replace(/\\n/g, "***")
          .replace(/"/g, "")
          .replace(/\\/g, "")
          .split("***")
          .map((s, i) => (
            <span
              key={i}
              className="text-text text-sm"
              dangerouslySetInnerHTML={{
                __html: s.replace(/_(.*?)_/g, "<b>$1</b>"),
              }}
            />
          ))}
      </div>
    </div>
  );
};