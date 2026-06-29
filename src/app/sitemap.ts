import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cinetravel.ai";

  const routes = [
    "", "/explore", "/login", "/book", "/book/flights", "/book/passengers",
    "/book/seats", "/book/insurance", "/book/payment", "/book/confirm",
    "/book/multi", "/book/calendar", "/book/flexible", "/book/price-lock",
    "/book/nearby", "/book/student", "/book/wifi", "/book/occasion",
    "/book/baggage", "/book/lounge", "/book/assistance", "/book/group",
    "/customer", "/customer/bookings", "/customer/track", "/customer/baggage",
    "/customer/checkin", "/customer/notifications", "/customer/loyalty",
    "/customer/wallet", "/customer/travelers", "/customer/profile",
    "/customer/rebook", "/customer/claims", "/customer/lost-found",
    "/customer/accessibility", "/customer/baggage-tag", "/customer/document-scanner",
    "/travel-info", "/travel-info/weather", "/travel-info/currency",
    "/travel-info/airports", "/travel-info/menu", "/travel-info/duty-free",
    "/travel-info/entertainment", "/travel-info/seat-reviews",
    "/travel-info/cabin-tour", "/travel-info/live-map", "/travel-info/wait-times",
    "/premium/chauffeur", "/premium/meet-greet", "/premium/helicopter",
    "/premium/vip", "/premium/charter",
    "/auteur", "/globe", "/journal", "/budget", "/fleet", "/routes",
    "/stories", "/corporate", "/alerts", "/upgrade", "/carbon", "/referral",
    "/employee", "/employee/checkin", "/employee/flights", "/employee/boarding",
    "/admin2", "/admin2/users", "/admin2/flights", "/admin2/analytics",
  ];

  return routes.map((route) => ({
    url: ${baseUrl},
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}