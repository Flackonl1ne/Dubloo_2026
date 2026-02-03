import { toast } from "react-toastify";
import { getDemoUser, saveFavorite } from "./demoStore";

// Portfolio demo: store favorites locally (no Firebase)
export function like(restroom, user) {
  const u = getDemoUser(user);

  if (!restroom?.id) {
    toast.error("Missing restroom id.");
    return;
  }

  saveFavorite(u.uid, {
    id: restroom.id,
    name: restroom.name,
    image: restroom.image,
    location: restroom.location,
  });

  toast.success("Saved to favorites (demo mode).");
}
