type AuthorAvatarProps = {
  initials: string;
  name: string;
  size?: "sm" | "md" | "lg";
};

const sizeClasses = {
  sm: "h-8 w-8 text-xs",
  md: "h-12 w-12 text-sm",
  lg: "h-24 w-24 text-2xl sm:h-28 sm:w-28 sm:text-3xl",
} as const;

export function AuthorAvatar({
  initials,
  name,
  size = "md",
}: AuthorAvatarProps) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full border-2 border-border bg-accent/10 font-semibold text-accent ${sizeClasses[size]}`}
      role="img"
      aria-label={`${name} profile photo placeholder`}
    >
      {initials}
    </div>
  );
}
