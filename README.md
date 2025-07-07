# Meteora Invent Monorepo

A high-performance monorepo containing Meteora's studio scripts and scaffold templates, powered by Turborepo and pnpm workspaces.

## 🏗️ Repository Structure

```
meteora-invent/
├── studio/                 # Scripts for DBC, DLMM, DAMM v1 & v2
│   ├── damm-v1/           # Dynamic AMM v1 scripts
│   ├── damm-v2/           # Dynamic AMM v2 scripts
│   ├── dbc/               # Dynamic Bonding Curve scripts
│   └── dlmm/              # Dynamic Liquidity Market Maker scripts
├── scaffolds/             # Frontend application templates
│   └── fun-launch/        # Fun launch scaffold template
└── packages/              # Shared packages (future)
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 9.0.0

### Installation

```bash
# Install pnpm if you haven't already
npm install -g pnpm@9

# Install all dependencies
pnpm install

# Build all packages
pnpm build
```

## 📦 Workspaces

### Studio (`@meteora-invent/studio`)

The studio workspace contains all the scripts for interacting with Meteora's protocols.

#### Available Scripts

**DAMM v1 Scripts:**
```bash
pnpm studio damm-v1-create-constant-product-pool
pnpm studio damm-v1-create-memecoin-pool
pnpm studio damm-v1-create-stable-pool
pnpm studio damm-v1-get-configs
pnpm studio damm-v1-create-position
pnpm studio damm-v1-withdraw-liquidity
pnpm studio damm-v1-claim-locked-fees
pnpm studio damm-v1-get-locked-fees
```

**DAMM v2 Scripts:**
```bash
pnpm studio damm-v2-create-pool
pnpm studio damm-v2-get-configs
pnpm studio damm-v2-create-position
pnpm studio damm-v2-get-positions
pnpm studio damm-v2-lock-position
pnpm studio damm-v2-withdraw-liquidity
pnpm studio damm-v2-get-position-fees
pnpm studio damm-v2-claim-position-fees
```

**DLMM Scripts:**
```bash
pnpm studio dlmm-create-balanced-position
pnpm studio dlmm-create-imbalanced-position
pnpm studio dlmm-get-active-bin
pnpm studio dlmm-get-positions-list
pnpm studio dlmm-add-balanced-liquidity
pnpm studio dlmm-add-imbalanced-liquidity
```

**DBC Scripts:**
```bash
pnpm studio dbc-quick-launch
pnpm studio dbc-create-config
pnpm studio dbc-create-partner-metadata
pnpm studio dbc-simulate-curve
pnpm studio dbc-migrate-to-damm-v1
pnpm studio dbc-migrate-to-damm-v2
pnpm studio dbc-swap-buy
pnpm studio dbc-swap-quote
```

### Scaffolds

#### Fun Launch (`@meteora-invent/scaffold-fun-launch`)

A Next.js application template for launching fun tokens.

```bash
# Run the fun-launch scaffold in development
pnpm --filter @meteora-invent/scaffold-fun-launch dev

# Build the fun-launch scaffold
pnpm --filter @meteora-invent/scaffold-fun-launch build
```

## 🛠️ Common Commands

### Root Level Commands

```bash
# Install dependencies for all workspaces
pnpm install

# Build all packages
pnpm build

# Run development servers for all packages that have them
pnpm dev

# Lint all packages
pnpm lint

# Format all packages
pnpm format

# Clean all build artifacts and node_modules
pnpm clean
```

### Working with Specific Workspaces

```bash
# Run a command in the studio workspace
pnpm studio <command>

# Run a command in a specific scaffold
pnpm --filter @meteora-invent/scaffold-fun-launch <command>

# Run a command in all scaffolds
pnpm scaffold <command>
```

### Turborepo Commands

```bash
# Run build with Turbo cache
pnpm build

# Run build without cache
pnpm build --force

# See Turbo build graph
pnpm build --graph
```

## 🔧 Configuration

### Environment Variables

Each workspace may require its own environment variables. Copy the `.env.example` files to `.env` and configure them:

```bash
# For studio workspace
cp studio/.env.example studio/.env

# For scaffolds
cp scaffolds/fun-launch/.env.example scaffolds/fun-launch/.env
```

### TypeScript

The monorepo uses TypeScript project references for better performance and type safety. Each workspace extends the root `tsconfig.json`.

## 📝 Development Guidelines

### Adding a New Scaffold

1. Create a new directory under `scaffolds/`
2. Initialize with your framework of choice
3. Update `package.json` name to follow the pattern: `@meteora-invent/scaffold-[name]`
4. Add necessary scripts to `package.json`
5. Create a `tsconfig.json` that extends the root config

### Adding Studio Scripts

1. Create your script in the appropriate directory (damm-v1, damm-v2, dlmm, or dbc)
2. Add a corresponding script entry in `studio/package.json`
3. Add the script to `turbo.json` pipeline if it needs special handling

## 🏃‍♂️ Performance

This monorepo uses Turborepo for:
- **Incremental builds**: Only rebuild what changed
- **Parallel execution**: Run independent tasks simultaneously
- **Remote caching**: Share build artifacts across machines (when configured)
- **Pipeline optimization**: Automatic task scheduling based on dependencies

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `pnpm format` and `pnpm lint`
4. Submit a pull request

## 📄 License

ISC

---

Built with ❤️ by [@dannweeeee](https://github.com/dannweeeee)
