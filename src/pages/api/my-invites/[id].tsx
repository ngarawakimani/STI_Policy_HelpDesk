import type { NextApiRequest, NextApiResponse } from "next";

import { getMyInvites } from "@/database/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await getMyInvites(req.query.id);

  if (result.err) {
    res.status(500).json({ errors: result.err });
  }

  res.status(200).json({ data: result.fetchMyInvites });
}
