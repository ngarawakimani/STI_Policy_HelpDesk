import type { NextApiRequest, NextApiResponse } from "next";

import { getSubmissionDetails } from "@/database/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await getSubmissionDetails(req.query.id);

  if (result.err) {
    res.status(500).json({ errors: result.err });
  }

  res.status(200).json({ data: result.submissionDetails });
}
