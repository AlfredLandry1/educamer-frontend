"use client";
import { useEffect, useState } from "react";
import { forumPosts, ForumPost } from "../../data/forum";
import { User, MessageCircle, Plus, Award, TrendingUp, Search, CheckCircle } from "lucide-react";
import DashboardLayout from "@/components/Dashboard/DashboardLayout";
import DashboardBreadcrumbs from "@/components/Dashboard/DashboardBreadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { toast, Toaster } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Formik, Form, Field } from "formik";

function ForumList({ posts }: { posts: ForumPost[] }) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              href={`/forum/${post.id}`}
              className="bg-white dark:bg-gray-950 rounded-xl border p-4 shadow flex flex-col gap-2 hover:shadow-lg transition cursor-pointer focus:outline focus:outline-2 focus:outline-blue-500"
            >
              <div className="flex items-center gap-2 mb-1">
                <User size={18} className="text-gray-400" />
                <span className="font-semibold text-gray-900 dark:text-gray-100">{post.authorId}</span>
                <span className="text-xs text-gray-500 ml-2">
                  {hydrated
                    ? new Date(post.date).toLocaleString()
                    : new Date(post.date).toISOString().slice(0, 16).replace("T", " ")}
                </span>
                <Badge variant={post.status === "open" ? "secondary" : "destructive"} className="ml-2 text-xs">
                  {post.status === "open" ? "Ouvert" : "Fermé"}
                </Badge>
              </div>
              <div className="text-lg font-medium text-primary-700 dark:text-primary-200 line-clamp-2">{post.content}</div>
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                <MessageCircle size={16} /> {post.replies.length} réponse{post.replies.length > 1 ? "s" : ""}
              </div>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function NewPostForm({ onAdd }: { onAdd: (content: string) => void }) {
  return (
    <Formik
      initialValues={{ post: "" }}
      onSubmit={(values, { resetForm }) => {
        if (values.post.trim()) {
          onAdd(values.post.trim());
          resetForm();
        }
      }}
    >
      {({ handleChange, values }) => (
        <Form className="flex gap-2 mt-4">
          <Field
            as={Input}
            type="text"
            name="post"
            placeholder="Démarrer un nouveau sujet..."
            value={values.post}
            onChange={handleChange}
            className="flex-1"
            aria-label="Nouveau sujet"
          />
          <Button type="submit" className="flex gap-2 items-center">
            <Plus size={18} /> Publier
          </Button>
        </Form>
      )}
    </Formik>
  );
}

export default function ForumPage() {
  const [posts, setPosts] = useState<ForumPost[]>(forumPosts);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("all");
  const [author, setAuthor] = useState<string>("all");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Liste unique des auteurs
  const authors = Array.from(new Set(forumPosts.map(p => p.authorId)));

  const filteredPosts = posts.filter(post => {
    const matchesSearch =
      post.content.toLowerCase().includes(search.toLowerCase()) ||
      post.authorId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "all" || post.status === status;
    const matchesAuthor = author === "all" || post.authorId === author;
    return matchesSearch && matchesStatus && matchesAuthor;
  });

  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  const paginatedPosts = filteredPosts.slice((page - 1) * pageSize, page * pageSize);

  const handleAddPost = (content: string) => {
    const newPost: ForumPost = {
      id: (posts.length + 1).toString(),
      authorId: "student-1", // à remplacer par l'utilisateur courant
      content,
      date: new Date().toISOString(),
      status: "open",
      replies: [],
    };
    setPosts([newPost, ...posts]);
    toast.custom(
      <div className="flex items-center gap-3 bg-green-100 border border-green-300 rounded-lg px-4 py-3 shadow-lg">
        <CheckCircle size={24} className="text-green-600" />
        <div>
          <div className="font-semibold text-green-800">Sujet publié !</div>
          <div className="text-green-700 text-sm">Votre sujet a bien été ajouté au forum.</div>
        </div>
      </div>,
      { position: "bottom-right", duration: 3000 }
    );
  };

  return (
    <DashboardLayout>
      <Toaster position="bottom-right" />
      <div className="w-full animate-fade-in flex flex-col gap-8">
        <DashboardBreadcrumbs />
        <div className="flex flex-col md:flex-row gap-8">
          {/* Colonne principale */}
          <div className="flex-1 flex flex-col gap-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Forum</h1>
              <p className="text-gray-600 dark:text-gray-400 mb-2">Posez vos questions, partagez vos astuces et entraidez-vous !</p>
            </div>
            {/* Filtres */}
            <Formik
              initialValues={{ search: search, status: status, author: author }}
              enableReinitialize
              onSubmit={() => {}}
            >
              {({ values, setFieldValue }) => (
                <div className="flex flex-col sm:flex-row gap-2 items-center mb-2">
                  <div className="relative w-full sm:w-64">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <Input
                      type="text"
                      name="search"
                      placeholder="Rechercher..."
                      value={values.search}
                      onChange={e => {
                        setSearch(e.target.value);
                        setFieldValue("search", e.target.value);
                      }}
                      className="w-full pl-10 pr-2"
                      aria-label="Recherche"
                    />
                  </div>
                  <Select value={values.status} onValueChange={val => { setStatus(val); setFieldValue("status", val); }}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Filtrer par statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="open">Ouvert</SelectItem>
                      <SelectItem value="closed">Fermé</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={values.author} onValueChange={val => { setAuthor(val); setFieldValue("author", val); }}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Filtrer par auteur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les auteurs</SelectItem>
                      {authors.map(a => (
                        <SelectItem key={a} value={a}>{a}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </Formik>
            <NewPostForm onAdd={handleAddPost} />
            <ForumList posts={paginatedPosts} />
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-4">
                <Button variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Précédent
                </Button>
                <span className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  Page {page} / {totalPages}
                </span>
                <Button variant="outline" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                  Suivant
                </Button>
              </div>
            )}
          </div>
          {/* Colonne gamification */}
          <div className="w-full md:w-80 flex flex-col gap-6">
            <div className="bg-white dark:bg-gray-950 rounded-xl border p-6 shadow flex flex-col gap-3">
              <h2 className="text-lg font-bold mb-2 flex items-center gap-2 text-primary-700 dark:text-primary-200">
                <Award size={20} /> Gamification
              </h2>
              <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 px-3 py-1 rounded-lg">
                <TrendingUp size={16} className="text-blue-600" />
                <span className="font-semibold text-blue-900 dark:text-blue-100">+50 XP</span>
              </div>
              <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-lg">
                <Award size={16} className="text-green-600" />
                <span className="font-semibold text-green-900 dark:text-green-100">Badge &quot;Débutant&quot;</span>
              </div>
              <div className="text-xs text-gray-500 mt-2">Participez pour gagner des XP et débloquer des badges !</div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 