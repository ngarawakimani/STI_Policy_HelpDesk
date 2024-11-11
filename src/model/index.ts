/* eslint-disable import/no-extraneous-dependencies */
import useSWR from "swr";

import fetcher from "@/utils/fetcher";

export const useSubmissions = () => {
  const { data, error, isLoading } = useSWR(`/api/submissions/`, fetcher);
  return {
    submissions: data,
    isLoading,
    isError: error,
  };
};

export const useMySubmissions = (researcherId: any) => {
  const { data, error, isLoading } = useSWR(
    `/api/my-submissions/${researcherId}`,
    fetcher
  );
  return {
    mySubmissions: data,
    isLoading,
    isError: error,
  };
};

export const useSubmissionDetails = (id: any) => {
  const { data, error, isLoading } = useSWR(`/api/description/${id}`, fetcher);
  return {
    submissionDetails: data,
    isLoading,
    isError: error,
  };
};

export const useProjectSubmissions = (researcherId: any) => {
  const { data, error, isLoading } = useSWR(
    `/api/project/${researcherId}`,
    fetcher
  );
  return {
    projectSubmission: data,
    isLoading,
    isError: error,
  };
};

export const useMatchedSubmissions = (expertId: any) => {
  const { data, error, isLoading } = useSWR(
    `/api/matched-project/${expertId}`,
    fetcher
  );
  return {
    projectMatched: data,
    isLoading,
    isError: error,
  };
};

export const useAccount = (uid: any) => {
  const { data, error, isLoading } = useSWR(`/api/account/${uid}`, fetcher);
  return {
    account: data,
    isLoading,
    isError: error,
  };
};

export const useExperts = () => {
  const { data, error, isLoading } = useSWR(`/api/experts`, fetcher);
  return {
    experts: data,
    isLoading,
    isError: error,
  };
};

export const useResearcher = (uid: any) => {
  const { data, error, isLoading } = useSWR(`/api/researcher/${uid}`, fetcher);
  return {
    researcher: data,
    researcherLoading: isLoading,
    researcherError: error,
  };
};
export const useUsers = (uid: any) => {
  const { data, error, isLoading } = useSWR(`/api/users/${uid}`, fetcher);
  return {
    userData: data,
    userLoading: isLoading,
    userError: error,
  };
};

export const FetchBiddedProjects = (uid: any) => {
  const { data, error, isLoading } = useSWR(
    `/api/bidded-projects/${uid}`,
    fetcher
  );
  return {
    bidded: data,
    biddedLoading: isLoading,
    biddedError: error,
  };
};

export const FetchMyBids = (uid: any) => {
  const { data, error, isLoading } = useSWR(`/api/my-bids/${uid}`, fetcher);
  return {
    bids: data,
    bidsLoading: isLoading,
    bidsError: error,
  };
};

export const FetchBidMails = () => {
  const { data, error, isLoading } = useSWR(`/api/mail`, fetcher);
  return {
    bidsmails: data,
    mailsLoading: isLoading,
    mailsError: error,
  };
};

export const FetchInvitedProjects = (expertId: any) => {
  const { data, error, isLoading } = useSWR(
    `/api/invited-projects/${expertId}`,
    fetcher
  );
  return {
    invited: data,
    invitedLoading: isLoading,
    invitedError: error,
  };
};

export const FetchMyInvites = (uid: any) => {
  const { data, error, isLoading } = useSWR(`/api/my-invites/${uid}`, fetcher);
  return {
    invites: data,
    invitesLoading: isLoading,
    invitesError: error,
  };
};

export const FetchInviteDetails = (uid: any) => {
  const { data, error, isLoading } = useSWR(
    `/api/invite-description/${uid}`,
    fetcher
  );
  return {
    inviteDetails: data,
    inviteDetailsLoading: isLoading,
    inviteDetailsError: error,
  };
};

export const FetchBidDetails = (uid: any) => {
  const { data, error, isLoading } = useSWR(
    `/api/bid-description/${uid}`,
    fetcher
  );
  return {
    bidDetails: data,
    bidDetailsLoading: isLoading,
    bidDetailsError: error,
  };
};

export const useUnmatchedProjects = (researcherId: any) => {
  const { data, error, isLoading } = useSWR(
    `/api/unmatched-projects/${researcherId}`,
    fetcher
  );
  return {
    unmatchedProjects: data,
    isLoading,
    isError: error,
  };
};
