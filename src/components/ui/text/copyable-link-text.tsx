import { cn } from "@/lib/utils";
import { Copy as CopyIcon, Check as CheckIcon } from "lucide-react";
import { useState } from "react";

type CopyAbleLinkTextProps = {
  text: string;
  className?: string;
  fontStyle?: string;
  iconStyle?: string;
};

export const CopyAbleLinkText = ({
  text,
  className,
  fontStyle,
  iconStyle,
}: CopyAbleLinkTextProps) => {
  const [isCopy, setIsCopy] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);

      setIsCopy(true);

      setTimeout(() => {
        setIsCopy(false);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={cn("flex gap-2 text-blue-700 items-center", className)}>
      <a
        href={text}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("text-sm hover:underline", fontStyle)}
      >
        {text}
      </a>
      {isCopy ? (
        <CheckIcon
          className={cn("size-4 cursor-pointer", iconStyle)}
          onClick={() => {
            handleCopy();
          }}
        />
      ) : (
        <CopyIcon
          className={cn("size-4 cursor-pointer", iconStyle)}
          onClick={() => {
            handleCopy();
          }}
        />
      )}
    </div>
  );
};
