export interface ErrorFallBackProps {
  error: Error & { digest?: string };
  reset: () => void;
}
