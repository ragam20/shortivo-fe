import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CopyAbleLinkText } from "@/components/ui/text/copyable-link-text";
import { Small } from "@/components/ui/typography";
import type { Link } from "@/types/api";

type ViewLinkDetailDialogProps = {
  link: Link | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const dummyCreatedAt = "April 1, 2026 at 10:00 AM";
const dummyUpdatedAt = "April 3, 2026 at 4:30 PM";

const DetailRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="grid gap-1 rounded-lg border border-stone-200 bg-stone-50 p-4">
      <Small className="font-medium uppercase tracking-wide text-stone-500">
        {label}
      </Small>
      {children}
    </div>
  );
};

export const ViewLinkDetailDialog = ({
  link,
  open,
  onOpenChange,
}: ViewLinkDetailDialogProps) => {
  if (!link) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl gap-5 bg-white p-6">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl">Link detail</DialogTitle>
          <DialogDescription>
            Review the selected link information before taking further action.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <DetailRow label="Title">
            <p className="text-sm font-medium text-stone-900">{link.title}</p>
          </DetailRow>

          <DetailRow label="Short url">
            <CopyAbleLinkText
              text={link.shortUrl}
              className="text-sm"
              fontStyle="font-medium text-blue-700"
            />
          </DetailRow>

          <DetailRow label="Original url">
            <a
              href={link.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-sm font-medium text-stone-900 hover:underline"
            >
              {link.originalUrl}
            </a>
          </DetailRow>

          <DetailRow label="Description">
            <p className="text-sm text-stone-700">
              {link.description || "No description available."}
            </p>
          </DetailRow>

          <div className="grid gap-4 md:grid-cols-2">
            <DetailRow label="Created">
              <p className="text-sm text-stone-700">{dummyCreatedAt}</p>
            </DetailRow>

            <DetailRow label="Last update">
              <p className="text-sm text-stone-700">{dummyUpdatedAt}</p>
            </DetailRow>
          </div>
        </div>

        <DialogFooter className="bg-transparent p-0 pt-1" showCloseButton={false}>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
            }}
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
