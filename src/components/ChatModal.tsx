"use client";

import React, { useState } from "react";
import { useApp } from "@/context/AppContext";
import { X, Send, ShieldAlert, AlertCircle, AlertTriangle, FlaskConical, MessageSquare } from "lucide-react";

export const ChatModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { messages, sendMessage, role, selectedOrder } = useApp();
  const [inputText, setInputText] = useState("");

  if (!isOpen) return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(selectedOrder?.id || "ord-01", inputText);
    setInputText("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full flex flex-col h-[560px] shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold flex items-center gap-1.5">
              Phòng Chat Nội Bộ #{selectedOrder?.orderCode || "FT202609180023"}
            </h3>
            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
              Bộ lọc Anti-Leakage đang kích hoạt bảo vệ
            </p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages list */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50">
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100 text-[11px] text-blue-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              Để đảm bảo an toàn tiền cọc Escrow và bảo hiểm hàng hóa, vui lòng không chia sẻ Số điện thoại hoặc giao dịch riêng ngoài nền tảng.
            </span>
          </div>

          {messages.map((msg) => {
            const isMe = msg.senderRole === role;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <span className="text-[10px] text-slate-400 px-1 mb-0.5">
                  {msg.senderName} · {msg.timestamp}
                </span>

                <div
                  className={`max-w-[85%] px-3.5 py-2 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? "bg-blue-600 text-white rounded-tr-xs"
                      : "bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-2xs"
                  } ${
                    msg.isFiltered
                      ? "bg-amber-100 text-amber-900 border border-amber-300 font-bold"
                      : ""
                  }`}
                >
                  {msg.content}
                </div>

                {msg.isFiltered && (
                  <span className="text-[10px] text-red-500 font-bold mt-0.5 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    Hệ thống đã che giấu số điện thoại / từ khóa né sàn
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Demo Quick Sample buttons */}
        <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[10px]">
          <span className="text-slate-400 font-semibold shrink-0">Thử nghiệm:</span>
          <button
            onClick={() => setInputText("Alo kết bạn Zalo số 0912345678 để đi riêng nhé")}
            className="px-2 py-1 rounded bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 font-medium shrink-0 flex items-center gap-1"
          >
            <FlaskConical className="w-3 h-3 text-amber-600" />
            Thử gõ lộ SĐT né sàn
          </button>
          <button
            onClick={() => setInputText("Xe tôi đang đến cổng cảng Đình Vũ, bạn cho người ra đón nhé")}
            className="px-2 py-1 rounded bg-white hover:bg-slate-200 border border-slate-200 text-slate-700 font-medium shrink-0 flex items-center gap-1"
          >
            <MessageSquare className="w-3 h-3 text-blue-600" />
            Tin nhắn trao đổi hợp lệ
          </button>
        </div>

        {/* Input box */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Nhập tin nhắn..."
            className="flex-1 bg-slate-100 text-xs px-3.5 py-2.5 rounded-xl border border-transparent focus:border-blue-400 focus:bg-white focus:outline-none"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl shadow-xs transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
