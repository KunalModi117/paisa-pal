import { useEffect, useRef } from "react";

export const useInfiniteScroll = ({
  loadMore,
  hasNextPage,
  isLoading,
}: {
  loadMore: () => void;
  hasNextPage: boolean;
  isLoading: boolean;
}) => {
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    const el = loaderRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasNextPage, isLoading, loadMore]);

  return loaderRef;
};
