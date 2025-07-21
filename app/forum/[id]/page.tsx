"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { forumPosts, ForumPost } from "../../../data/forum";
import { User, MessageCircle, Award, TrendingUp, ArrowLeft, Plus } from "lucide-react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import DashboardBreadcrumbs from "@/components/Dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Formik, Form, Field } from "formik";
import { Input } from "@/components/ui/input";

function findPostById(id: string, posts: ForumPost[]): ForumPost | undefined {
  for (const post of posts) {
    if (post.id === id) return post;
    const found = findPostById(id, post.replies);
    if (found) return found;
  }
  return undefined;
}

function ForumReplies({ replies }: { replies: ForumPost[] }) {
  return (
    <div className="pl-6 border-l border-gray-200 dark:border-gray-800 flex flex-col gap-4 mt-2">
      {replies.map((reply) => (
        <div key={reply.id} className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <User size={16} className="text-gray-400" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">{reply.authorId}</span>
            <span className="text-xs text-gray-500 ml-2">{new Date(reply.date).toLocaleString()}</span>
            <Badge variant={reply.status === "open" ? "secondary" : "destructive"} className="ml-2 text-xs">{reply.status === "open" ? "Ouvert" : "Fermé"}</Badge>
          </div>
          <div className="text-gray-800 dark:text-gray-200 mb-1">{reply.content}</div>
          {reply.replies.length > 0 && <ForumReplies replies={reply.replies} />}
        </div>
      ))}
    </div>
  );
}

function NewReplyForm({ onAdd }: { onAdd: (content: string) => void }) {
  return (
    <Formik
      initialValues={{ reply: "" }}
      onSubmit={(values, { resetForm }) => {
        if (values.reply.trim()) {
          onAdd(values.reply.trim());
          resetForm();
        }
      }}
    >
      {({ handleChange, values }) => (
        <Form className="flex gap-2 mt-4">
          <Field
            as={Input}
            type="text"
            name="reply"
            placeholder="Votre réponse..."
            value={values.reply}
            onChange={handleChange}
            className="flex-1"
            aria-label="Réponse"
          />
          <Button type="submit" className="flex gap-2 items-center">
            <Plus size={18} /> Répondre
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default function ForumPostPage() {
  const params = useParams();
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [post, setPost] = useState<ForumPost | undefined>(undefined);
  const [replies, setReplies] = useState<ForumPost[]>([]);

  useEffect(() => {
    setHydrated(true);
    if (params && typeof params.id === "string") {
      const found = findPostById(params.id, forumPosts);
      setPost(found);
      setReplies(found?.replies || []);
    }
  }, [params]);

  const handleAddReply = (content: string) => {
    if (!post) return;
    const newReply: ForumPost = {
      id: `${post.id}-${replies.length + 1}`,
      authorId: "student-1", // à remplacer par l'utilisateur courant
      content,
      date: new Date().toISOString(),
      status: "open",
      replies: [],
    };
    setReplies([newReply, ...replies]);
  };

  if (!hydrated) {
    // Évite l'hydratation mismatch
    return null;
  }
  if (!post) {
    return (
      <DashboardLayout>
        <div className="w-full flex flex-col items-center justify-center min-h-[60vh] text-center">
          <h1 className="text-3xl font-bold mb-4">Sujet introuvable</h1>
          <p className="text-gray-500 mb-6">Ce sujet n&apos;existe pas ou a été supprimé.</p>
          <Button onClick={() => router.push("/forum")}>Retour au forum</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="w-full animate-fade-in flex flex-col gap-8">
        <DashboardBreadcrumbs />
        <Button variant="outline" className="w-fit mb-2" onClick={() => router.push("/forum")}> <ArrowLeft size={18} /> Retour au forum</Button>
        <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow flex flex-col gap-2">
          <div className="flex items-center gap-2 mb-1">
            <User size={20} className="text-gray-400" />
            <span className="font-semibold text-gray-900 dark:text-gray-100">{post.authorId}</span>
            <span className="text-xs text-gray-500 ml-2">{new Date(post.date).toLocaleString()}</span>
            <Badge variant={post.status === "open" ? "secondary" : "destructive"} className="ml-2 text-xs">{post.status === "open" ? "Ouvert" : "Fermé"}</Badge>
          </div>
          <div className="text-xl font-bold text-primary-700 dark:text-primary-200 mb-2">{post.content}</div>
          <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
            <MessageCircle size={16} /> {replies.length} réponse{replies.length > 1 ? "s" : ""}
          </div>
        </div>
        <NewReplyForm onAdd={handleAddReply} />
        <ForumReplies replies={replies} />
        {/* Gamification */}
        <div className="w-full md:w-80 max-w-xs mt-8">
          <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow flex flex-col gap-3">
            <h2 className="text-lg font-bold mb-2 flex items-center gap-2 text-primary-700 dark:text-primary-200">
              <Award size={20} /> Gamification
            </h2>
            <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-lg">
              <TrendingUp size={16} className="text-blue-600" />
              <span className="font-semibold text-blue-900 dark:text-blue-100">+10 XP</span>
            </div>
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-lg">
              <Award size={16} className="text-green-600" />
              <span className="font-semibold text-green-900 dark:text-green-100">Badge &quot;Répondeur&quot;</span>
            </div>
            <div className="text-xs text-gray-500 mt-2">Répondez pour gagner des XP et débloquer des badges&apos;!</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 