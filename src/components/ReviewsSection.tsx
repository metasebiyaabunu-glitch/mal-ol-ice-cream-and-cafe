import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Plus, Check } from 'lucide-react';
import { REVIEWS, SHOP_INFO } from '../data/maloData';
import { Review } from '../types';

export default function ReviewsSection() {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [newAuthor, setNewAuthor] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(5);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleLike = (id: string) => {
    setReviewsList(
      reviewsList.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newComment) return;

    const newRev: Review = {
      id: `r-user-${Date.now()}`,
      author: newAuthor,
      role: 'Verified Customer',
      rating: newRating,
      timeAgo: 'Just now',
      comment: newComment,
      likes: 0
    };

    setReviewsList([newRev, ...reviewsList]);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowReviewModal(false);
      setNewAuthor('');
      setNewComment('');
    }, 1500);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Title */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full mb-3">
          <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-600" />
          <span>4.8 Rating • 16 Google Reviews</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif tracking-tight">
          What Visitors Say About ማልኦ
        </h2>
        <p className="mt-2 text-stone-600 text-sm sm:text-base max-w-xl mx-auto">
          Read authentic reviews from locals and travelers visiting our 1st floor cafe in Arba Minch!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Rating Breakdown Summary */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 space-y-6">
          <div className="text-center pb-4 border-b border-stone-100">
            <div className="text-5xl font-black text-stone-900 font-serif">{SHOP_INFO.rating}</div>
            <div className="flex items-center justify-center gap-1 text-amber-500 my-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 stroke-amber-500" />
              ))}
            </div>
            <p className="text-xs text-stone-500 font-medium">Based on 16 verified Google Maps reviews</p>
          </div>

          {/* Progress Bars */}
          <div className="space-y-2 text-xs font-bold text-stone-600">
            {[
              { label: '5 stars', percent: 85, count: 14 },
              { label: '4 stars', percent: 10, count: 2 },
              { label: '3 stars', percent: 0, count: 0 },
              { label: '2 stars', percent: 0, count: 0 },
              { label: '1 star', percent: 0, count: 0 }
            ].map((bar) => (
              <div key={bar.label} className="flex items-center gap-3">
                <span className="w-12 shrink-0">{bar.label}</span>
                <div className="flex-1 h-2.5 bg-stone-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-500 rounded-full"
                    style={{ width: `${bar.percent}%` }}
                  />
                </div>
                <span className="w-6 text-right text-stone-400 shrink-0">{bar.count}</span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="w-full py-3.5 bg-stone-900 hover:bg-black text-amber-400 font-extrabold text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Reviews Cards Column */}
        <div className="lg:col-span-8 space-y-4">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="glass-card glass-card-hover rounded-3xl p-6 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white font-extrabold text-sm flex items-center justify-center shadow-xs">
                    {rev.author.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-stone-900 text-base">{rev.author}</h4>
                    <p className="text-xs text-stone-400 font-medium">{rev.role || 'Visitor'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] text-stone-400">{rev.timeAgo}</span>
                </div>
              </div>

              <p className="text-sm text-stone-700 leading-relaxed">{rev.comment}</p>

              {rev.photos && rev.photos.length > 0 && (
                <div className="flex gap-2 pt-2">
                  {rev.photos.map((photo, i) => (
                    <img
                      key={i}
                      src={photo}
                      alt="Review photo"
                      className="w-20 h-20 rounded-xl object-cover border border-stone-200"
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
              )}

              <div className="pt-2 flex items-center justify-between text-xs text-stone-500 border-t border-stone-100">
                <button
                  onClick={() => handleLike(rev.id)}
                  className="flex items-center gap-1.5 hover:text-amber-600 font-bold transition-colors"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Helpful ({rev.likes})</span>
                </button>
                <span className="text-[11px] text-stone-400">Verified Visit</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <h3 className="font-extrabold text-lg text-stone-900">Write a Review for ማልኦ</h3>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-stone-400 hover:text-stone-800"
              >
                ✕
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-2 text-emerald-600">
                <Check className="w-12 h-12 mx-auto bg-emerald-100 p-2 rounded-full" />
                <div className="font-extrabold text-lg">Thank You!</div>
                <p className="text-xs text-stone-600">Your review has been published.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="e.g. Samuel K."
                    className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className={`p-1.5 rounded-lg text-amber-500 ${
                          star <= newRating ? 'opacity-100' : 'opacity-30'
                        }`}
                      >
                        <Star className="w-6 h-6 fill-amber-400" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Your Experience</label>
                  <textarea
                    required
                    rows={3}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="How was the Mango Banana ice cream, coffee, or board games?"
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-sm font-medium focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm rounded-xl shadow-md"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
