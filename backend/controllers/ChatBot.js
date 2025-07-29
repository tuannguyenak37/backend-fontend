import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const fallbackFlowers = [
  {
    name_SP: "Hoa hồng đỏ",
    gia_SP: 200000,
    mota_SP: "hoa tươi từ Đà Lạt",
  },
  {
    name_SP: "Hoa cúc mùa thu",
    gia_SP: 150000,
    mota_SP: "hoa cúc trồng tươi sạch",
  },
  {
    name_SP: "hoa hồng phấn",
    gia_SP: 250000,
    mota_SP: "hoa hồng phấn trắng đặc biệt nhập khẩu từ Pháp",
  },
  {
    name_SP: "giỏ hoa sặc sỡ",
    gia_SP: 220000,
    mota_SP: "Giỏ hoa gồm nhiều loại hoa do thợ chuyên cắm hoa tỉ mỉ",
  },
  {
    name_SP: "Hoa hồng trắng bó",
    gia_SP: 600000,
    mota_SP:
      "Thể hiện sự tinh tế, sang trọng, tao nhã – một khởi đầu mới trong cuộc sống",
  },
  {
    name_SP: "Hoa hồng vàng",
    gia_SP: 70000,
    mota_SP:
      "Lời chúc đầy hi vọng và tích cực – một lời cảm ơn nhẹ nhàng nhưng sâu sắc",
  },
  {
    name_SP: "Hoa hồng xanh biển bó",
    gia_SP: 800000,
    mota_SP:
      "Mang đến niềm tin và sức mạnh cho điều tưởng chừng không thể thực hiện được",
  },
];

const ChatBot = async (req, res) => {
  const { text, bio, interests } = req.body;

  if (!text || text.trim() === "") {
    return res
      .status(400)
      .json({ success: false, error: "Thiếu nội dung tin nhắn" });
  }

  // 👉 Gọi API sản phẩm hoặc fallback nếu lỗi
  const getProductData = async () => {
    try {
      const [flowers, gifs, combos] = await Promise.all([
        axios.get("https://backendflower-9t22.onrender.com/api/productList"),
        axios.get("https://backendflower-9t22.onrender.com/api/productListGif"),
        axios.get(
          "https://backendflower-9t22.onrender.com/api/productListCombo"
        ),
      ]);

      return {
        flowers: flowers.data?.data || [],
        gifs: gifs.data?.data || [],
        combos: combos.data?.data || [],
      };
    } catch (err) {
      console.error("❌ Lỗi gọi API sản phẩm:", err.message);
      return {
        flowers: fallbackFlowers,
        gifs: [],
        combos: [],
      };
    }
  };

  const productData = await getProductData();

  const formatProducts = (items, title) => {
    if (!items || items.length === 0) return "";
    return (
      `\n🌸 ${title}:\n` +
      items
        .slice(0, 5)
        .map(
          (item) =>
            `- ${item.name_SP} (${item.gia_SP.toLocaleString()} VNĐ): ${
              item.mota_SP
            }`
        )
        .join("\n")
    );
  };

  const productSummary = `
🛍️ Một vài sản phẩm gợi ý:
${formatProducts(productData.flowers, "Hoa tươi")}
${formatProducts(productData.gifs, "Quà tặng")}
${formatProducts(productData.combos, "Combo đặc biệt")}
  `;

  const systemPrompt = `Bạn là một cô gái dễ thương chuyên tư vấn bán hoa và quà tặng. Bạn có thể trả lời ngắn gọn, tự nhiên và thân thiện.
Sở thích: ${interests || "hoa, quà tặng, lãng mạn"}.
Bio: ${bio || "Tôi thích hoa và giúp mọi người chọn quà 🎁"}.

Dưới đây là danh sách sản phẩm để bạn tư vấn:
${productSummary}

Gợi ý: Hãy dùng biểu tượng cảm xúc khi thích hợp. Trả lời như một người bạn, có chút lả lơi cũng được 😉.`;

  try {
    const openaiRes = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: text },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const message =
      openaiRes.data?.choices?.[0]?.message?.content || "❌ Không có phản hồi";

    console.log("🤖 Bot trả lời:", message);

    res.json({ success: true, message });
  } catch (err) {
    console.error("❌ Lỗi gọi OpenAI:", err.message);
    res.status(500).json({
      success: false,
      message: "Bot hiện không phản hồi được, bạn thử lại sau chút nhé 😢",
    });
  }
};

export default ChatBot;
