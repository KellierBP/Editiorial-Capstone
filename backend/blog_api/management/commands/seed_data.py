from django.core.management.base import BaseCommand
from blog_api.models import Category, Post, User, Comment
from django.utils.text import slugify


class Command(BaseCommand):
    help = 'Seeds the database with comprehensive demo data for capstone showcase'

    def handle(self, *args, **kwargs):
        self.stdout.write('Creating comprehensive demo database...\n')

        # Ensure categories exist
        categories_data = [
            'Architecture', 'Art', 'Design', 'Fashion', 'Food',
            'Photography', 'Technology', 'Travel', 'Culture',
            'Lifestyle', 'Music', 'Science'
        ]

        categories = {}
        for cat_name in categories_data:
            category, created = Category.objects.get_or_create(name=cat_name)
            categories[cat_name] = category
            if created:
                self.stdout.write(self.style.SUCCESS(f'Created category: {cat_name}'))

        # Create demo authors (8 new + keep existing admin and testauthor)
        demo_authors_data = [
            {'username': 'sarah_chen', 'email': 'sarah@example.com', 'first_name': 'Sarah', 'last_name': 'Chen'},
            {'username': 'marcus_wright', 'email': 'marcus@example.com', 'first_name': 'Marcus', 'last_name': 'Wright'},
            {'username': 'elena_rodriguez', 'email': 'elena@example.com', 'first_name': 'Elena', 'last_name': 'Rodriguez'},
            {'username': 'james_kim', 'email': 'james@example.com', 'first_name': 'James', 'last_name': 'Kim'},
            {'username': 'olivia_taylor', 'email': 'olivia@example.com', 'first_name': 'Olivia', 'last_name': 'Taylor'},
            {'username': 'david_patel', 'email': 'david@example.com', 'first_name': 'David', 'last_name': 'Patel'},
            {'username': 'sophia_anderson', 'email': 'sophia@example.com', 'first_name': 'Sophia', 'last_name': 'Anderson'},
            {'username': 'alex_morgan', 'email': 'alex@example.com', 'first_name': 'Alex', 'last_name': 'Morgan'},
        ]

        authors = []
        
        # Get existing users
        try:
            admin = User.objects.get(username='admin')
            authors.append(admin)
            self.stdout.write(f'Using existing user: admin')
        except User.DoesNotExist:
            pass

        try:
            testauthor = User.objects.get(username='testauthor')
            authors.append(testauthor)
            self.stdout.write(f'Using existing user: testauthor')
        except User.DoesNotExist:
            pass

        # Create new demo authors
        for author_data in demo_authors_data:
            user, created = User.objects.get_or_create(
                username=author_data['username'],
                defaults={
                    'email': author_data['email'],
                    'first_name': author_data['first_name'],
                    'last_name': author_data['last_name'],
                    'is_author': True,
                }
            )
            if created:
                user.set_password('demo123')
                user.save()
                self.stdout.write(self.style.SUCCESS(f'Created author: {author_data["username"]}'))
            authors.append(user)

        # Create comprehensive posts
        posts_data = [
            # Architecture posts
            {
                'title': 'The Future of Minimalist Architecture',
                'content': '''In an era of constant stimulation and digital noise, minimalist architecture offers a sanctuary of clarity and purpose. This exploration examines how contemporary designers are reinterpreting restraint and simplicity.

## The Evolution of Less

Minimalism emerged not as a rejection of beauty, but as a refinement of it. From the Bauhaus movement to Japanese "Ma" — the appreciation of negative space — designers have long understood that what we remove is as important as what we include.

## Material Honesty

Modern minimalism celebrates materials in their truest form. Concrete reveals its texture, wood shows its grain, metal accepts its patina. This honest approach creates intimacy between object and observer.

## Spatial Poetry

The best minimalist spaces feel expansive yet intimate, simple yet sophisticated. They prove that luxury isn't about abundance, but about the quality of experience.''',
                'category': 'Architecture',
                'author_index': 0,
            },
            {
                'title': 'Brutalist Revival: Beauty in Concrete',
                'content': '''Brutalist architecture, once dismissed as cold and imposing, is experiencing a remarkable renaissance. Young architects and designers are rediscovering the raw beauty and honest expression of exposed concrete structures.

## Understanding Brutalism

The term comes from "béton brut" (raw concrete in French), not "brutal." These buildings celebrate structural honesty and functional clarity.

## Modern Interpretations

Contemporary brutalism softens the harsh edges with natural light, greenery, and thoughtful material combinations while maintaining the bold geometric forms.''',
                'category': 'Architecture',
                'author_index': 1,
            },
            # Photography posts
            {
                'title': 'Exploring Light in Contemporary Photography',
                'content': '''Light is the fundamental element of photography. Understanding how to harness, manipulate, and celebrate light transforms ordinary scenes into extraordinary moments.

## Natural Light Mastery

The golden hour offers photographers warm, diffused light that flatters subjects and creates depth in landscapes. But midday sun, often avoided, can create dramatic shadows and high contrast when used intentionally.

## Studio Techniques

Controlled lighting environments allow photographers to sculpt light precisely, creating dramatic effects and highlighting specific features. The key is understanding light quality, direction, and intensity.

## Chasing Shadows

Shadows are as important as highlights. They add dimension, mystery, and visual interest to compositions.''',
                'category': 'Photography',
                'author_index': 2,
            },
            {
                'title': 'The Revival of Analog Photography',
                'content': '''In our digital age, film photography is experiencing a renaissance. Artists and enthusiasts are rediscovering the tactile, intentional process of shooting on film.

## Why Film Matters

Each frame costs money and requires thought. This constraint breeds creativity and mindfulness in composition. There's no instant review, no delete button — just pure intention.

## The Aesthetic Appeal

Film grain, color rendition, and dynamic range create a unique aesthetic that digital sensors struggle to replicate authentically. Each film stock has its own character.

## The Process as Art

Developing film in a darkroom is meditative. Watching an image emerge in the developer tray connects you to photography's roots and the chemical magic that makes it possible.''',
                'category': 'Photography',
                'author_index': 3,
            },
            # Fashion posts
            {
                'title': 'Sustainable Fashion: A New Paradigm',
                'content': '''The fashion industry is undergoing a transformation. Sustainability is no longer a niche concern but a fundamental requirement for the future of design.

## Slow Fashion Movement

Quality over quantity. Timeless pieces over fast trends. This philosophy challenges the disposable nature of modern fashion and encourages thoughtful consumption.

## Ethical Production

Transparency in supply chains, fair wages, and environmentally conscious materials are becoming standard expectations rather than premium features.

## Circular Economy

Brands are designing for longevity and recyclability, creating systems where garments can be repaired, resold, or recycled rather than discarded.''',
                'category': 'Fashion',
                'author_index': 4,
            },
            {
                'title': 'The Art of Textile Innovation',
                'content': '''Modern textile technology is revolutionizing fashion. From lab-grown leather to fabrics made from ocean plastic, innovation is driving sustainability and performance.

## Material Science

New materials offer unprecedented combinations of comfort, durability, and environmental responsibility. Spider silk proteins, mushroom leather, and pineapple fiber are just the beginning.

## Traditional Techniques Meet Technology

Ancient weaving methods are being enhanced with modern materials and digital design tools, creating textiles that honor craft while embracing innovation.''',
                'category': 'Fashion',
                'author_index': 5,
            },
            # Design posts
            {
                'title': 'Modern Design Principles',
                'content': '''Design is not just what it looks like and feels like. Design is how it works. This principle guides contemporary designers in creating functional beauty.

## Form Follows Function

Every element should serve a purpose. Decoration for decoration's sake is eliminated in favor of meaningful design choices that enhance usability.

## User-Centered Approach

Understanding user needs, behaviors, and contexts ensures designs that truly serve their intended purpose. Empathy drives great design.

## Iterative Process

Design is never finished. Continuous testing, feedback, and refinement lead to solutions that evolve with user needs and technological capabilities.''',
                'category': 'Design',
                'author_index': 6,
            },
            {
                'title': 'The Psychology of Color in Design',
                'content': '''Color is one of the most powerful tools in a designer's arsenal. Understanding color psychology helps create designs that evoke specific emotions and drive desired actions.

## Cultural Context

Colors carry different meanings across cultures. Red signifies luck in China but danger in Western contexts. Designers must consider their audience's cultural background.

## Emotional Impact

Warm colors energize, cool colors calm. Saturation and brightness affect intensity of emotional response. Strategic color use guides user attention and creates hierarchy.

## Accessibility Matters

Color choices must consider color blindness and visual impairments. Sufficient contrast ensures designs are usable by everyone.''',
                'category': 'Design',
                'author_index': 7,
            },
            # Technology posts
            {
                'title': 'The Future of AI in Creative Work',
                'content': '''Artificial intelligence is transforming creative industries. Rather than replacing human creativity, AI tools are becoming powerful collaborators that augment human capabilities.

## Generative Design

AI can explore thousands of design variations in seconds, presenting options humans might never consider. Designers then curate and refine these AI-generated concepts.

## Workflow Enhancement

Repetitive tasks are automated, freeing creatives to focus on strategic thinking and artistic vision. AI handles the tedious, humans handle the inspired.

## Ethical Considerations

As AI becomes more capable, questions of authorship, originality, and creative ownership become increasingly important. The industry must establish ethical guidelines.''',
                'category': 'Technology',
                'author_index': 8,
            },
            {
                'title': 'Blockchain Beyond Cryptocurrency',
                'content': '''Blockchain technology extends far beyond Bitcoin. Its applications in art, supply chain, and digital identity are revolutionizing how we think about trust and verification.

## Digital Art Provenance

NFTs provide verifiable ownership and provenance for digital art, solving the problem of authenticity in the digital realm.

## Supply Chain Transparency

Blockchain enables complete tracking of products from source to consumer, ensuring ethical sourcing and authenticity.

## Decentralized Identity

Self-sovereign identity systems give individuals control over their personal data while enabling secure verification.''',
                'category': 'Technology',
                'author_index': 9,
            },
            # Travel posts
            {
                'title': 'Slow Travel: The Art of Meaningful Exploration',
                'content': '''Slow travel rejects the checklist mentality of tourism in favor of deep, immersive experiences. It's about understanding places rather than just seeing them.

## Living Like a Local

Staying in one place for weeks or months allows you to develop routines, discover hidden gems, and form genuine connections with local communities.

## Sustainable Tourism

Slow travel naturally reduces environmental impact while supporting local economies more effectively than quick tourist visits.

## Personal Transformation

Extended stays in foreign places challenge assumptions, broaden perspectives, and facilitate personal growth in ways brief visits cannot.''',
                'category': 'Travel',
                'author_index': 0,
            },
            {
                'title': 'Urban Exploration: Hidden Cities',
                'content': '''Every city has layers invisible to casual visitors. Urban exploration reveals the hidden infrastructure, forgotten spaces, and untold stories beneath the surface.

## Architectural Archaeology

Abandoned buildings, underground tunnels, and industrial ruins tell stories of urban evolution and economic change.

## Safety and Ethics

Responsible urban exploration respects property rights, prioritizes safety, and preserves rather than damages discovered spaces.

## Documentary Purpose

Photographing and documenting these spaces preserves their memory and raises awareness of urban history and development.''',
                'category': 'Travel',
                'author_index': 1,
            },
            # Culture posts
            {
                'title': 'The Renaissance of Vinyl Records',
                'content': '''Vinyl records are experiencing unprecedented popularity. This isn't mere nostalgia — it's a rejection of disposable digital culture in favor of tangible, intentional music consumption.

## The Ritual of Listening

Playing vinyl requires active participation. You must select a record, place it carefully, and flip it midway. This ritual creates mindful listening experiences.

## Superior Sound Quality

Audiophiles argue vinyl's analog warmth surpasses digital precision. The debate continues, but the subjective experience matters most.

## Album Art as Art

Large format album covers transform music packaging into displayable art, creating visual connections to the music.''',
                'category': 'Culture',
                'author_index': 2,
            },
            {
                'title': 'Street Art: From Vandalism to Cultural Movement',
                'content': '''Street art has evolved from illegal graffiti to recognized art form. Cities now commission murals, and street artists exhibit in prestigious galleries.

## Democratizing Art

Street art brings art to public spaces, making it accessible to everyone regardless of economic status or cultural capital.

## Political Voice

Many street artists use their work to comment on social issues, giving voice to marginalized communities and challenging power structures.

## Ephemeral Beauty

The temporary nature of street art — subject to weather, removal, or overpainting — adds urgency and preciousness to the viewing experience.''',
                'category': 'Culture',
                'author_index': 3,
            },
            # Art posts
            {
                'title': 'Abstract Expressionism in the Digital Age',
                'content': '''Digital tools are giving new life to abstract expressionism. Artists combine traditional techniques with digital manipulation to create works that honor the movement's spirit while embracing contemporary technology.

## Gestural Freedom

Digital brushes can simulate traditional media while offering undo buttons and infinite variations, allowing artists to explore more freely.

## Color Theory Revolution

Digital color spaces enable combinations impossible with physical pigments, expanding the abstract expressionist palette.

## Process Documentation

Digital tools allow artists to record every brushstroke, creating time-lapse videos that reveal the creative process.''',
                'category': 'Art',
                'author_index': 4,
            },
            {
                'title': 'The Power of Installation Art',
                'content': '''Installation art transforms spaces into immersive experiences. Viewers don't just observe — they inhabit the artwork, becoming part of the piece.

## Spatial Storytelling

Installations use entire rooms or buildings to tell stories, creating narratives that unfold as viewers move through space.

## Sensory Engagement

The best installations engage multiple senses — sight, sound, smell, touch — creating memorable, embodied experiences.

## Temporary Magic

Many installations exist briefly, making the experience precious and unrepeatable. This ephemerality adds emotional weight.''',
                'category': 'Art',
                'author_index': 5,
            },
            # Food posts
            {
                'title': 'Farm-to-Table: Beyond the Buzzword',
                'content': '''Farm-to-table has become a cliché, but the principles behind it remain vital. True farm-to-table dining celebrates seasonal ingredients, supports local farmers, and reduces environmental impact.

## Seasonal Eating

Menus that change with seasons offer fresher ingredients and connect diners to natural cycles. Strawberries taste better in June than December.

## Knowing Your Farmer

Direct relationships between chefs and farmers ensure quality, support local economies, and create accountability in food production.

## Reduced Food Miles

Local sourcing dramatically reduces transportation emissions and ensures ingredients are harvested at peak ripeness.''',
                'category': 'Food',
                'author_index': 6,
            },
            {
                'title': 'The Art of Fermentation',
                'content': '''Fermentation is experiencing a renaissance. This ancient preservation technique creates complex flavors while providing health benefits through probiotics.

## Microbial Magic

Beneficial bacteria and yeasts transform simple ingredients into complex, flavorful foods. Kimchi, sauerkraut, and kombucha are just the beginning.

## Health Benefits

Fermented foods support gut health, aid digestion, and may boost immune function. Traditional cultures have known this for millennia.

## Flavor Development

Fermentation creates umami, depth, and complexity impossible to achieve through other cooking methods.''',
                'category': 'Food',
                'author_index': 7,
            },
            # Lifestyle posts
            {
                'title': 'Minimalist Living: Less is More',
                'content': '''Minimalism isn't about deprivation — it's about intentionality. By reducing possessions, we create space for what truly matters.

## Intentional Consumption

Every purchase is considered. Does it serve a purpose? Does it bring joy? Will it last? This mindfulness reduces waste and clutter.

## Mental Clarity

Physical clutter creates mental clutter. Simplified spaces promote focus, creativity, and peace of mind.

## Environmental Impact

Consuming less reduces environmental footprint. Minimalism aligns personal wellbeing with planetary health.''',
                'category': 'Lifestyle',
                'author_index': 8,
            },
            {
                'title': 'The Digital Detox Movement',
                'content': '''Constant connectivity is exhausting. Digital detoxes — temporary breaks from screens and social media — are becoming essential for mental health.

## Reclaiming Attention

Smartphones fragment attention into tiny pieces. Detoxes restore the ability to focus deeply and think clearly.

## Real Connections

Face-to-face interactions become richer when phones aren't competing for attention. Presence is a gift we give each other.

## Rediscovering Boredom

Boredom sparks creativity. Constant stimulation prevents the mind from wandering into interesting territory.''',
                'category': 'Lifestyle',
                'author_index': 9,
            },
            # Music posts
            {
                'title': 'The Evolution of Electronic Music',
                'content': '''Electronic music has evolved from underground raves to mainstream acceptance. Its influence permeates all genres, reshaping how we create and consume music.

## Democratized Production

Affordable software and hardware enable bedroom producers to create professional-quality music, breaking down barriers to entry.

## Genre Fluidity

Electronic music blurs genre boundaries, creating hybrid styles that defy categorization. This fluidity reflects our interconnected world.

## Live Performance Innovation

Electronic artists are reimagining live performance, using controllers, synthesizers, and visual elements to create immersive experiences.''',
                'category': 'Music',
                'author_index': 0,
            },
            {
                'title': 'Jazz in the 21st Century',
                'content': '''Modern jazz artists honor tradition while pushing boundaries. The genre continues to evolve, incorporating influences from hip-hop, electronic music, and global traditions.

## Tradition and Innovation

Young jazz musicians study the masters while creating sounds that reflect contemporary life. Respect for history fuels forward motion.

## Global Fusion

Jazz has always absorbed influences. Today's artists draw from Afrobeat, Indian classical music, and Latin rhythms, creating truly global sounds.

## Intimate Venues

Small clubs remain jazz's natural habitat. The proximity between performers and audience creates magical, unrepeatable moments.''',
                'category': 'Music',
                'author_index': 1,
            },
            # Science posts
            {
                'title': 'The Promise of Quantum Computing',
                'content': '''Quantum computers harness quantum mechanics to solve problems impossible for classical computers. While still experimental, they promise breakthroughs in medicine, materials science, and cryptography.

## Quantum Advantage

Certain calculations that would take classical computers millennia could be solved by quantum computers in hours. This isn't just faster — it's fundamentally different.

## Current Limitations

Quantum computers are fragile, requiring extreme cooling and isolation. Scaling them up while maintaining quantum states remains challenging.

## Future Applications

Drug discovery, climate modeling, and optimization problems could be revolutionized by quantum computing once the technology matures.''',
                'category': 'Science',
                'author_index': 2,
            },
            {
                'title': 'CRISPR and the Future of Medicine',
                'content': '''CRISPR gene editing technology enables precise modifications to DNA. Its medical applications could cure genetic diseases, but raise important ethical questions.

## Precision Medicine

CRISPR allows doctors to target disease at the genetic level, potentially curing conditions previously considered untreatable.

## Ethical Considerations

The ability to edit human genes raises profound questions about enhancement, inequality, and unintended consequences.

## Agricultural Applications

Beyond medicine, CRISPR could create drought-resistant crops, reduce pesticide use, and address food security challenges.''',
                'category': 'Science',
                'author_index': 3,
            },
        ]

        created_posts = []
        for i, post_data in enumerate(posts_data):
            author = authors[post_data['author_index'] % len(authors)]
            category = categories[post_data['category']]
            
            post, created = Post.objects.get_or_create(
                title=post_data['title'],
                defaults={
                    'content': post_data['content'],
                    'category': category,
                    'status': 'published',
                    'author': author,
                }
            )
            if created:
                created_posts.append(post)
                self.stdout.write(self.style.SUCCESS(f'Created post: {post.title} by {author.username}'))

        # Create some comments
        comment_texts = [
            "This is a fascinating perspective! I never thought about it this way.",
            "Great article! Very informative and well-written.",
            "I disagree with some points, but overall a thought-provoking read.",
            "This resonates with my own experience. Thank you for sharing!",
            "Excellent analysis. Looking forward to more content like this.",
            "This changed my perspective completely. Mind-blowing!",
            "Well researched and beautifully presented.",
            "I've been thinking about this topic a lot lately. Great timing!",
            "This deserves more attention. Sharing with my network.",
            "Insightful and inspiring. Thank you!",
        ]

        for post in created_posts[:15]:  # Add comments to first 15 posts
            num_comments = (hash(post.slug) % 4) + 1  # 1-4 comments per post
            for j in range(num_comments):
                commenter = authors[(hash(post.slug) + j) % len(authors)]
                comment_text = comment_texts[(hash(post.slug) + j) % len(comment_texts)]
                
                Comment.objects.get_or_create(
                    post=post,
                    author=commenter,
                    content=comment_text
                )

        self.stdout.write(self.style.SUCCESS('\n=== Database Seeding Complete! ==='))
        self.stdout.write(f'Total Users: {User.objects.count()}')
        self.stdout.write(f'Total Authors: {User.objects.filter(is_author=True).count()}')
        self.stdout.write(f'Total Categories: {Category.objects.count()}')
        self.stdout.write(f'Total Posts: {Post.objects.count()}')
        self.stdout.write(f'Total Comments: {Comment.objects.count()}')
        self.stdout.write(self.style.SUCCESS('\nYour database is now showcase-ready!'))
