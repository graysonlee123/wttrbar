import z from "zod";

const EnvironmentSchema = z.object({
  LOCATION: z.string(),
});
export type Environment = z.infer<typeof EnvironmentSchema>;

export default EnvironmentSchema;
