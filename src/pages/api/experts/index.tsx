import type { NextApiRequest, NextApiResponse } from "next";

import { getExperts } from "@/database/db";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const result = await getExperts();

  if (result.err) {
    res.status(500).json({ errors: result.err });
  }

  res.status(200).json({ data: result.fetchExperts });
}
