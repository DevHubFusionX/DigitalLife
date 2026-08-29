import { useState } from 'react';
import { useResources } from '../hooks/useResources';
import { usePlaybooks } from '../hooks/usePlaybooks';
import { useVideos } from '../hooks/useVideos';
import { useMetadata } from '../hooks/useMetadata';
import { usePageSEO } from '../hooks/usePageSEO';

import ResourcesHero from '../components/resources/ResourcesHero';
import FeaturedResourcesSection from '../components/resources/FeaturedResourcesSection';
import PlaybooksSection from '../components/resources/PlaybooksSection';
import ResourceFilterBar from '../components/resources/ResourceFilterBar';
import ResourceGrid from '../components/resources/ResourceGrid';
import VideoResourcesSection from '../components/resources/VideoResourcesSection';

export default function ResourcesPage() {
  const { resources } = useResources();
  const { playbooks } = usePlaybooks();
  const { videos } = useVideos();
  const { categories, formats } = useMetadata();

  const categoryNames = categories.map((c) => c.name);
  const formatNames = formats.map((f) => f.name);

  const [selectedFeaturedTab, setSelectedFeaturedTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedFormat, setSelectedFormat] = useState('All Formats');
  const [selectedPriceType, setSelectedPriceType] = useState<'all' | 'free' | 'paid'>('all');

  usePageSEO({
    title: 'Resource Library | Free SOP Downloads & MSME Growth Playbooks | Digitalife Ehub',
    description:
      'Access our growing collection of guides, templates, toolkits, frameworks, training materials, and practical insights designed to help you grow with structure.',
    keywords:
      'free SOP template word download, small business operations manual template pdf, business workflow design template, standard operating procedures checklist download, small business organizational structure chart, editable company policy template, daily operations report sheet excel, employee onboarding checklist template, growth roadmap worksheet for founders, small business dashboard template download, business-formalization-tools, free-SOP-downloads, msme-growth-frameworks, small-business-playbooks, operational-efficiency-templates, skill-monetization-guides, structure-over-hustle, brand-positioning-resources, business-clarity-worksheets',
  });

  // Filtering logic for Browse All
  const filteredResources = resources.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTopic =
      selectedTopic === 'All Topics' ||
      (item.category || '').toLowerCase() === selectedTopic.toLowerCase();
    const matchesFormat =
      selectedFormat === 'All Formats' ||
      (item.format || '').toLowerCase() === selectedFormat.toLowerCase();
    const matchesPrice =
      selectedPriceType === 'all'
        ? true
        : selectedPriceType === 'free'
        ? item.isFree
        : !item.isFree;

    return matchesSearch && matchesTopic && matchesFormat && matchesPrice;
  });

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    selectedTopic !== 'All Topics' ||
    selectedFormat !== 'All Formats' ||
    selectedPriceType !== 'all';

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedTopic('All Topics');
    setSelectedFormat('All Formats');
    setSelectedPriceType('all');
  };

  const handleExploreClick = () => {
    document.getElementById('browse-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#fffdf5] text-slate-900 pt-20">
      {/* SECTION 1: HERO */}
      <ResourcesHero totalResources={resources.length} onExploreClick={handleExploreClick} />

      {/* SECTION 2: FEATURED RESOURCES */}
      <FeaturedResourcesSection
        resources={resources}
        categoryNames={categoryNames}
        selectedFeaturedTab={selectedFeaturedTab}
        onSelectTab={setSelectedFeaturedTab}
      />

      {/* SECTION 3: EXPERT PLAYBOOKS */}
      <PlaybooksSection playbooks={playbooks} />

      {/* SECTION 4: BROWSE ALL */}
      <section className="py-20 max-w-7xl mx-auto px-6" id="browse-section">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-950 mb-3">
            Browse all resources
          </h2>
          <p className="text-slate-500 text-sm font-bold">Explore Free Tools, Templates, and Ebooks</p>
        </div>

        <ResourceFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          selectedFormat={selectedFormat}
          setSelectedFormat={setSelectedFormat}
          selectedPriceType={selectedPriceType}
          setSelectedPriceType={setSelectedPriceType}
          categoryNames={categoryNames}
          formatNames={formatNames}
          totalFiltered={filteredResources.length}
          totalResources={resources.length}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
        />

        <ResourceGrid resources={filteredResources} onResetFilters={handleResetFilters} />
      </section>

      {/* SECTION 5: VIDEO RESOURCES */}
      <VideoResourcesSection videos={videos} />
    </div>
  );
}
