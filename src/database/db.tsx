import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { db } from "../config/firebase";

export const getSubmissions = async () => {
  const q = query(collection(db, "submissions"), where("matched", "==", false));
  try {
    const querySnapshot = await getDocs(q);
    const submissions: any[] = [];
    querySnapshot.forEach((document) => {
      submissions.push({ id: document.id, ...document.data() });
    });
    return { submissions };
  } catch (err: any) {
    return { err };
  }
};

export const getMySubmissions = async (researcher_id: unknown) => {
  const q = query(
    collection(db, "submissions"),
    where("matched", "==", false),
    where("researcher_id", "==", researcher_id)
  );
  try {
    const querySnapshot = await getDocs(q);
    const mySubmissions: any[] = [];
    querySnapshot.forEach((document) => {
      mySubmissions.push({ id: document.id, ...document.data() });
    });
    return { mySubmissions };
  } catch (err: any) {
    return { err };
  }
};

export const getSubmissionDetails = async (id: any) => {
  try {
    const docRef = doc(db, "submissions", id);
    const docSnap = await getDoc(docRef);
    const submissionDetails: any[] = [];
    submissionDetails.push({ id: docSnap.id, ...docSnap.data() });
    return { submissionDetails };
  } catch (err: any) {
    return { err };
  }
};

export const getProjectSubmissions = async (researcher_id: unknown) => {
  const q = query(
    collection(db, "submissions"),
    where("matched", "==", true),
    where("researcher_id", "==", researcher_id)
  );
  try {
    const querySnapshot = await getDocs(q);
    const projectSubmissions: any[] = [];
    querySnapshot.forEach((document) => {
      projectSubmissions.push({ id: document.id, ...document.data() });
    });
    return { projectSubmissions };
  } catch (err: any) {
    return { err };
  }
};

export const getMatchedSubmissions = async (expert_id: unknown) => {
  const q = query(
    collection(db, "submissions"),
    where("matched", "==", true),
    where("expert_id", "==", expert_id)
  );
  try {
    const querySnapshot = await getDocs(q);
    const projectMatched: any[] = [];
    querySnapshot.forEach((document) => {
      projectMatched.push({ id: document.id, ...document.data() });
    });
    return { projectMatched };
  } catch (err: any) {
    return { err };
  }
};

export const getUserAccount = async (uid: any) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const account: any[] = [];
    account.push({ id: docSnap.id, ...docSnap.data() });
    return { account };
  } catch (err: any) {
    return { err };
  }
};

export const getResearcher = async (uid: any) => {
  try {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const researcher: any[] = [];
    researcher.push({ id: docSnap.id, ...docSnap.data() });
    return { researcher };
  } catch (err: any) {
    return { err };
  }
};

export const getExperts = async () => {
  const q = query(
    collection(db, "users"),
    where("accountType", "==", "expert")
  );
  try {
    const querySnapshot = await getDocs(q);
    const fetchExperts: any[] = [];
    querySnapshot.forEach((document) => {
      fetchExperts.push({ id: document.id, ...document.data() });
    });
    return { fetchExperts };
  } catch (err: any) {
    return { err };
  }
};

export const getMyBids = async (uid: any) => {
  const q = query(collection(db, "bids"), where("requester_id", "==", uid));
  try {
    const querySnapshot = await getDocs(q);
    const fetchMyBids: any[] = [];
    querySnapshot.forEach((document) => {
      fetchMyBids.push({ id: document.id, ...document.data() });
    });
    return { fetchMyBids };
  } catch (err: any) {
    return { err };
  }
};

export const getBiddedProjects = async (uid: any) => {
  const q = query(collection(db, "bids"), where("researcher_id", "==", uid));
  try {
    const querySnapshot = await getDocs(q);
    const fetchBiddedProjects: any[] = [];
    querySnapshot.forEach((document) => {
      fetchBiddedProjects.push({ id: document.id, ...document.data() });
    });
    return { fetchBiddedProjects };
  } catch (err: any) {
    return { err };
  }
};

export const getMyInvites = async (uid: any) => {
  const q = query(collection(db, "invites"), where("requester_id", "==", uid));
  try {
    const querySnapshot = await getDocs(q);
    const fetchMyInvites: any[] = [];
    querySnapshot.forEach((document) => {
      fetchMyInvites.push({ id: document.id, ...document.data() });
    });
    return { fetchMyInvites };
  } catch (err: any) {
    return { err };
  }
};

export const getInvitedProjects = async (expert_id: any) => {
  const q = query(
    collection(db, "invites"),
    where("expert_id", "==", expert_id)
  );
  try {
    const querySnapshot = await getDocs(q);
    const fetchInvitedProjects: any[] = [];
    querySnapshot.forEach((document) => {
      fetchInvitedProjects.push({ id: document.id, ...document.data() });
    });
    return { fetchInvitedProjects };
  } catch (err: any) {
    return { err };
  }
};

export const getInviteDetails = async (id: any) => {
  try {
    const docRef = doc(db, "invites", id);
    const docSnap = await getDoc(docRef);
    const inviteDetails: any[] = [];
    inviteDetails.push({ id: docSnap.id, ...docSnap.data() });
    return { inviteDetails };
  } catch (err: any) {
    return { err };
  }
};

export const getBidDetails = async (id: any) => {
  try {
    const docRef = doc(db, "bids", id);
    const docSnap = await getDoc(docRef);
    const bidDetails: any[] = [];
    bidDetails.push({ id: docSnap.id, ...docSnap.data() });
    return { bidDetails };
  } catch (err: any) {
    return { err };
  }
};

// export const getBidMails = async (id: any) => {
//   try {
//     const docRef = doc(db, "mail", id);
//     const docSnap = await getDoc(docRef);
//     const bidDetails: any[] = [];
//     bidDetails.push({ id: docSnap.id, ...docSnap.data() });
//     return { bidDetails };
//   } catch (err: any) {
//     return { err };
//   }
// };

export const getUnmatchedProjects = async (researcher_id: unknown) => {
  const q = query(
    collection(db, "submissions"),
    where("matched", "==", false),
    where("unmatched", "==", true),
    where("researcher_id", "==", researcher_id)
  );
  try {
    const querySnapshot = await getDocs(q);
    const unmatchedProjects: any[] = [];
    querySnapshot.forEach((document) => {
      unmatchedProjects.push({ id: document.id, ...document.data() });
    });
    return { unmatchedProjects };
  } catch (err: any) {
    return { err };
  }
};
