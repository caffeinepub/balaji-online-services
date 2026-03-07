import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Notification } from "../backend.d";
import { useActor } from "./useActor";

export function useGetNotifications() {
  const { actor, isFetching } = useActor();
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getNotifications();
      return [...result].sort(
        (a, b) => Number(b.createdAt) - Number(a.createdAt),
      );
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddNotification() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      password,
      message,
      dateLabel,
    }: {
      password: string;
      message: string;
      dateLabel: string;
    }) => {
      if (!actor) throw new Error("No actor");
      await actor.addNotification(password, message, dateLabel);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useEditNotification() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      password,
      id,
      message,
      dateLabel,
    }: {
      password: string;
      id: bigint;
      message: string;
      dateLabel: string;
    }) => {
      if (!actor) throw new Error("No actor");
      await actor.editNotification(password, id, message, dateLabel);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}

export function useDeleteNotification() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      password,
      id,
    }: {
      password: string;
      id: bigint;
    }) => {
      if (!actor) throw new Error("No actor");
      await actor.deleteNotification(password, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
