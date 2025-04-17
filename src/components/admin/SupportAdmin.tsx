import { useState } from "react";
import { useSupportStore } from "../../store/supportStore";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { toastStyles } from "../ui/sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Skeleton } from "../ui/skeleton";

export default function SupportAdmin() {
  const { messages, addAdminResponse, deleteMessage } = useSupportStore();
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const [response, setResponse] = useState("");
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null);

  const handleResponse = (messageId: number) => {
    if (response.trim()) {
      addAdminResponse(messageId, response);
      setResponse("");
      setSelectedMessage(null);
      toast.success("Response sent successfully!", {
        className: toastStyles.adminResponse.background,
        duration: 5000,
      });
    }
  };

  const handleDeleteMessage = (messageId: number) => {
    setOpenDeleteDialog(true);
    setMessageToDelete(messageId);
  };

  const confirmDelete = () => {
    if (messageToDelete !== null) {
      deleteMessage(messageToDelete);
      toast.success("Message deleted successfully!", {
        className: toastStyles.adminResponse.background,
        duration: 5000,
      });
      setOpenDeleteDialog(false);
      setMessageToDelete(null);
    }
  };

  const cancelDelete = () => {
    setOpenDeleteDialog(false);
    setMessageToDelete(null);
  };

  const pendingMessages = messages.filter((message) => !message.adminResponse);

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-lg min-h-screen mt-20 flex-1 lg:ml-[17rem] 2xl:ml-[30rem]">
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <h1 className="text-3xl font-bold text-gray-800 mb-6">Support Panel</h1>

      {/* Mostrar mensajes pendientes si existen */}
      {pendingMessages.length > 0 && (
        <div className="space-y-4">
          {pendingMessages.map((message) => (
            <div
              key={message.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer relative"
              onClick={() => setSelectedMessage(message.id)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteMessage(message.id);
                }}
                className="absolute mt-2 top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
                title="Delete message"
              >
                <Trash2 className="h-5 w-5" />
              </button>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-gray-800">User Message</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(message.timestamp).toLocaleString()}
                  </p>
                </div>
                <span className="px-2 py-1 rounded-full text-xs mr-6 mt-2 bg-yellow-100 text-yellow-700">
                  Pending
                </span>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-white rounded-lg border border-gray-200">
                  <h4 className="font-medium text-gray-700 mb-2">
                    Message Content:
                  </h4>
                  <p className="text-gray-600">{message.userMessage}</p>
                </div>
                {selectedMessage === message.id && (
                  <div className="p-4 bg-white rounded-lg border border-gray-200">
                    <h4 className="font-medium text-gray-700 mb-2">
                      Write Response:
                    </h4>
                    <textarea
                      value={response}
                      onChange={(e) => setResponse(e.target.value)}
                      className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      rows={4}
                    />
                    <button
                      onClick={() => handleResponse(message.id)}
                      className="mt-4 w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition-colors"
                    >
                      Send Response
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mostrar mensaje vacío y skeletons solo cuando no hay mensajes pendientes */}
      {pendingMessages.length === 0 && (
        <div className="space-y-6">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="text-center space-y-4">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900">
                No messages to respond
              </h3>
              <p className="text-gray-500">
                There are currently no pending messages that require a response.
              </p>
            </div>
          </div>

          {/* Skeleton Preview */}
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-gray-200 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
                <div className="p-4 rounded-lg border border-gray-200 space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-10 w-full mt-4" />
                </div>
              </div>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full" />
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-gray-200 space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
