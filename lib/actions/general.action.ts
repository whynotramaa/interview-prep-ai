import { db } from "@/firebase/admin";



export async function getInterviewByUserId(userId: string): Promise<Interview[] | null> {
    const interviews = await db.collection('interviews').where('userId', '==', userId).orderBy('createdAt', 'desc').get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
    })) as Interview[];
}

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<any[] | null> {
  const { limit = 20 } = params;
  
  // Only filter by finalized since that's what we see in your Firebase
  const interviews = await db
    .collection('interviews')
    .where('finalized', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));
}

  export async function getInterviewById(id: string): Promise<Interview | null> {
    const doc = await db.collection('interviews').doc(id).get();
  
    if (!doc.exists) return null;
  
    return { id: doc.id, ...doc.data() } as Interview;
  }