import Link from "next/link";
import { auth } from "@/auth";
import { getProducts } from "@/lib/products";
import { AuthButtons } from "@/component/auth-buttons";

export default async function HomePage() {
  const session = await auth();
  const products = getProducts();
  const isLoggedIn = !!session?.user;

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="brand-block">
          <p className="eyebrow">Marketplace</p>
          <h1>สินค้า</h1>
        </div>

        <AuthButtons isLoggedIn={isLoggedIn} userName={session?.user?.name} />
      </header>

      <section className="product-grid" aria-label="รายการสินค้า">
        {products.map((product) => (
          <article key={product.id} className="product-card" data-testid="product">
            <div className="product-meta">
              <span className="product-badge">ยอดนิยม</span>
              <h2>{product.name}</h2>
            </div>

            <p className="product-description">{product.description}</p>

            <div className="product-footer">
              <p className="product-price">฿{product.price.toLocaleString("th-TH")}</p>

              {isLoggedIn && (
                <div className="product-actions">
                  <Link className="action-link edit-link" href={`/products/${product.id}/edit`}>
                    แก้ไข
                  </Link>
                  <Link className="action-link delete-link" href={`/products/${product.id}/delete`}>
                    ลบ
                  </Link>
                </div>
              )}
            </div>
          </article>
        ))}

        {products.length === 0 && (
          <div className="empty-state">
            <p>ไม่มีสินค้า</p>
          </div>
        )}
      </section>
    </main>
  );
}
