export type content = {
  blocks: [
    {
      id: string;
      type: string;
      data: Record<string, unknown>;
    },
  ];
};
